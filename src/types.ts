export interface LayoutsOptions {
  /**
   * @default "default"
   */
  layout: string;
  /**
   * @default ["src/layouts"]
   */
  dirs: string[];
  /**
   * @default []
   */
  exclude: string[];
}
export interface PagesOptions {
  /**
   * @default ["src\/pages\/**\/*.vue"]
   */
  include: string[];
  /**
   * @default []
   */
  exclude: string[];
}

export interface Options {
  layouts: LayoutsOptions;
  pages: PagesOptions;
}

export interface UserOptions {
  layouts?: Partial<LayoutsOptions>;
  pages?: Partial<PagesOptions>;
}

export interface ResolvedOptions extends Options {}

export interface LayoutComponent {
  path: string;
  name: string;
  layout: string;
}
