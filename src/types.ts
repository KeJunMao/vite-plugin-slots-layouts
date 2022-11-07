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

