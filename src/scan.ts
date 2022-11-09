import { LayoutComponent, LayoutsOptions, ResolvedOptions } from "./types";
import fg from "fast-glob";
import { basename, dirname, extname, join, relative, resolve } from "path";
import { pascalCase, splitByCase, camelCase } from "scule";
import { logger } from "./utils";
import { blue, green, red } from "colorette";
import { normalizePath } from "vite";
import { hyphenate } from "@vue/shared";

export const scanLayouts = async (
  options: ResolvedOptions,
  cwd = process.cwd()
) => {
  const layoutsOptions = options.layouts;
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
      const dirNameParts = [
        ...splitByCase(options.LayoutComponentPrefix),
        ...splitByCase(normalizePath(relative(dir, dirname(filePath)))),
      ];

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

      console.log(dirNameParts, componentNameParts, fileNameParts);

      const componentName =
        pascalCase(componentNameParts) + pascalCase(fileNameParts);

      const pascalName = pascalCase(componentName).replace(/["']/g, "");
      const kebabName = hyphenate(componentName);
      const isExistsLayout = layouts.find((l) => l.kebabName === kebabName);
      if (isExistsLayout) {
        logger.warn(
          `The ${blue(pascalName)} layout is exists, ignore\nExists:  ${
            isExistsLayout.path
          } ${green("(used)")}\nScanned: ${filePath}`
        );
        continue;
      }
      logger.debug(
        `Found ${blue(`<${componentName} />`)}, append ${blue(
          pascalName
        )} layout`
      );
      const layout: LayoutComponent = {
        pascalName,
        kebabName,
        path: filePath,
        layout: camelCase(kebabName.replace(options.LayoutComponentPrefix, "")),
      };
      logger.debug(layout);
      layouts.push(layout);
    }
  }
  return layouts;
};
