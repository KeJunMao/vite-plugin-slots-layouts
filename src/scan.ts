import { LayoutComponent, LayoutsOptions } from "./types";
import fg from "fast-glob";
import { basename, dirname, extname, join, relative, resolve } from "path";
import { pascalCase, splitByCase, camelCase } from "scule";

export const scanLayouts = async (
  layoutsOptions: LayoutsOptions,
  cwd = process.cwd()
) => {
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
      let fileName = basename(filePath, extname(filePath));
      if (fileName.toLowerCase() === "index") {
        fileName = basename(dirname(filePath));
      }
      const fileNameParts = splitByCase(fileName);
      const componentName = pascalCase(fileNameParts);
      const layoutName = camelCase(componentName);
      if (layouts.find((l) => l.layout === layoutName)) {
        console.warn("ignore", filePath);
        continue;
      }
      layouts.push({
        name: componentName + "Layout",
        path: filePath,
        layout: camelCase(componentName),
      });
    }
  }

  return layouts;
};
