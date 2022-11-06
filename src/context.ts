import { ResolvedConfig } from "vite";
import { scanLayouts } from "./scan";
import {
  LayoutComponent,
  PageComponent,
  ResolvedOptions,
  UserOptions,
} from "./types";
import { resolveOptions } from "./utils";
import { parse } from "@vue/compiler-dom";
import MagicString from "magic-string";

export class Context {
  options: ResolvedOptions;
  config!: ResolvedConfig;
  layouts!: LayoutComponent[];

  constructor(userOptions: UserOptions) {
    this.options = resolveOptions(userOptions);
  }

  async initLayouts() {
    this.layouts = await scanLayouts(this.options.layouts, this.config.root);
  }
  async virtualModule() {
    await this.initLayouts();
    const imports = this.layouts.map((v) => {
      return `import ${v.name} from "${v.path}"`;
    });
    const components = this.layouts.map((v) => {
      return `app.component("${v.name}", ${v.name})`;
    });
    return `${imports.join("\n")}

export default {
  install(app) {
    ${components.join("\n")}
  }
}`;
  }

  generatorPageCode(code: string, id: string) {
    const t = parse(code);
    const source = new MagicString(code, {
      filename: id,
    });
    let layoutName: string | boolean = this.options.layouts.layout;
    let layoutProps: Record<string, any> = {};
    let templates: string[] = [];
    t?.children.forEach((v) => {
      if (v.type !== 1) {
        return;
      }
      if (v.tag === "layout") {
        v.props.forEach((prop) => {
          if (prop.name === "name" && prop.type === 6) {
            layoutName = prop.value?.content ?? "default";
          }
          if (prop.name === "disabled") {
            layoutName = false;
          }
        });
        const content = v.children?.[0];
        if (content && content.type === 2) {
          const rawLayoutProps = content.content || "{}";
          try {
            layoutProps = {
              ...layoutProps,
              ...JSON.parse(rawLayoutProps),
            };
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (v.tag === "template") {
        source.replace(v.loc.source, "");
        if (v.props.find((v) => v.type === 7)) {
          templates.push(v.loc.source);
        } else {
          templates.push(
            v.loc.source.replace("<template", "<template #default")
          );
        }
      }
    });
    if (!layoutName) {
      return false;
    }
    const layout = this.layouts.find((l) => l.layout === layoutName);
    if (!layout) {
      return false;
    }

    source.prepend(`<template>
<${layout.name}>
${templates.join("\n")}
</${layout.name}>
</template>`);
    const map = source.generateMap();
    return {
      code: source.toString(),
      map,
      // map
    };
  }
}