import { UserOptions, ResolvedOptions } from "./types";
import consola from "consola";

export const resolveOptions = (userOptions: UserOptions): ResolvedOptions => {
  return {
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
})