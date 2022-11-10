export interface LayoutsOptions {
  /**
   * Default layout name
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
   * Pages options
   */
  pages: PagesOptions;
  /**
   * Layout components prefix
   * @default "layout"
   */
  prefix: string;
  /**
   * Generate virtual module
   * @default true
   */
  useVirtualModule: boolean;
}

export interface UserOptions extends Partial<Options> {}

export interface ResolvedOptions extends Options {}

export interface LayoutComponent {
  pascalName: string;
  kebabName: string;
  path: string;
  layout: string;
}
