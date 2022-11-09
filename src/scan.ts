import { LayoutComponent, LayoutsOptions } from "./types";
import fg from "fast-glob";
import { basename, dirname, extname, join, relative, resolve } from "path";
import { pascalCase, splitByCase, camelCase } from "scule";
import { logger } from "./utils";
import { blue, green, red } from "colorette";
import { normalizePath } from "vite";

export const scanLayouts = async (
  layoutsOptions: LayoutsOptions,
  cwd = process.cwd()
) => {
  logger.debug(`Scan layouts dirs: ${blue(`${layoutsOptions.dirs}`)}`);
  const layouts: LayoutComponent[] = [];

  for (let dir of layoutsOptions.dirs) {
    dir = resolve(cwd, dir);
    const files = await fg("**/*.vue", {
      ignore: ["node_modules", ".git", "**/__*__/*", ...layoutsOptions.exclude],
      onlyFiles: true,
      cwd: resolve(cwd, dir),
    });
    files.sort();
    for (let file of files) {
      const filePath = join(dir, file);

      // dir parts
      const dirNameParts = splitByCase(normalizePath(relative(dir, dirname(filePath))));

      let fileName = basename(filePath, extname(filePath));
      if (fileName.toLowerCase() === "index") {
        fileName = basename(dirname(filePath));
      }

      const fileNameParts = splitByCase(fileName);

      const componentNameParts: string[] = [];

      while (
        dirNameParts.length &&
        (dirNameParts[0] || "").toLowerCase() !==
          (fileNameParts[0] || "").toLowerCase()
      ) {
        componentNameParts.push(dirNameParts.shift()!);
      }

      const componentName =
        pascalCase(componentNameParts) + pascalCase(fileNameParts);

      const layoutName = camelCase(componentName);
      const isExistsLayout = layouts.find((l) => l.layout === layoutName);
      if (isExistsLayout) {
        logger.warn(
          `The ${blue(layoutName)} layout is exists, ignore\nExists:  ${
            isExistsLayout.path
          } ${green("(used)")}\nScanned: ${filePath}`
        );
        continue;
      }
      logger.debug(
        `Found ${blue(`<${componentName} />`)}, append ${blue(
          layoutName
        )} layout`
      );
      const layout = {
        name: componentName + "Layout",
        path: filePath,
        layout: camelCase(componentName),
      };
      logger.debug(layout);
      layouts.push(layout);
    }
  }
  return layouts;
};
