export interface LayoutsOptions {
  layout: string;
  dirs: string[];
  exclude: string[];
}
export interface PagesOptions {
  include: string[];
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

export interface PageComponent {
  layout: LayoutComponent;
  props: Record<string, any>;
  templates: string[];
}

// export interface LayoutSlot {
//   name: string;
// }
// export interface Options {
//   /**
//    * layout dir
//    *
//    * @default "src/layouts"
//    */
//   dir: string,
//   /**
//    * default layout
//    *
//    * @default "default"
//    */
//   layout: string
// }
// export type FileContainer = {
//   path: string
//   files: string[]
// }
// export type UserOptions = Partial<Options>
