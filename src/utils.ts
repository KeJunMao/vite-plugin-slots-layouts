import { UserOptions, ResolvedOptions } from "./types";
import consola from "consola";
import { ResolvedConfig } from "vite";
import { resolve } from "path";

export const resolveOptions = (userOptions: UserOptions): ResolvedOptions => {
  return {
    useVirtualModule: true,
    prefix: "layout",
    ...userOptions,
    pages: {
      include: ["src/pages/**/*.vue"],
      exclude: [],
      ...userOptions.pages,
    },
    layouts: {
      dirs: ["src/layouts"],
      exclude: [],
      layout: "default",
      ...userOptions.layouts,
    },
  };
};

export const logger = consola.create({
  defaults: {
    tag: "vite-plugin-slots-layouts",
  },
});

export const isTarget = (
  path: string,
  options: ResolvedOptions,
  config: ResolvedConfig
) => {
  for (const dir of options.layouts.dirs) {
    const dirPath = resolve(config.root, dir);
    if (path.startsWith(dirPath)) return true;
  }
  return false;
};
