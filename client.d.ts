declare module "virtual:slots-layouts" {
  import type { Plugin, DefineComponent } from "vue";
  export const layouts: Record<string, DefineComponent<{}, {}, any>>;
  const plugin: Plugin;
  export default plugin;
}
