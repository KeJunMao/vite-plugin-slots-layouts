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
      const dirNameParts = splitByCase(
        normalizePath(relative(dir, dirname(filePath)))
      );

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

      const prefixParts = splitByCase(options.prefix);
      let layoutName =
        pascalCase(componentNameParts) + pascalCase(fileNameParts);
      layoutName = camelCase(layoutName);

      const componentName = pascalCase(prefixParts) + pascalCase(layoutName);

      const pascalName = pascalCase(componentName).replace(/["']/g, "");
      const kebabName = hyphenate(componentName);
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
        `Found ${blue(`<${kebabName} />`)}, append ${blue(layoutName)} layout`
      );
      const layout: LayoutComponent = {
        pascalName,
        kebabName,
        path: filePath,
        layout: layoutName,
      };
      logger.debug(layout);
      layouts.push(layout);
    }
  }
  return layouts;
};
