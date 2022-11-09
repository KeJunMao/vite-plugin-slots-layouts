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
  /**
   * Layout options
   */
  layouts: LayoutsOptions;
  /**
   * pages options
   */
  pages: PagesOptions;
  /**
   * Layout components prefix
   * @default "layout"
   */
  LayoutComponentPrefix: string;
}

export interface UserOptions {
  layouts?: Partial<LayoutsOptions>;
  pages?: Partial<PagesOptions>;
}

export interface ResolvedOptions extends Options {}

export interface LayoutComponent {
  pascalName: string;
  kebabName: string;
  path: string;
  layout: string;
}
