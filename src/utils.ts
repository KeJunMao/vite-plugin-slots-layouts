import { UserOptions, ResolvedOptions } from "./types";

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