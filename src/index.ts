import { resolve } from "path";
import { ModuleNode, Plugin, createFilter } from "vite";
import { resolvedVirtualModuleId, virtualModuleId } from "./constant";
import { Context } from "./context";
import { UserOptions } from "./types";

export const VitePluginUniLayout = (userOptions: UserOptions = {}): Plugin => {
  const ctx = new Context(userOptions);
  return {
    name: "vite-plugin-uni-layout",
    enforce: "pre",
    configResolved(_config) {
      ctx.config = _config;
      ctx.initLayouts();
    },
    configureServer({ watcher, ws, moduleGraph }) {
      const dirs = ctx.options.layouts.dirs.map((dir) =>
        resolve(ctx.config.root, dir)
      );
      watcher.add(dirs);
      const reloadModule = (module: ModuleNode | undefined, path = "*") => {
        if (module) {
          moduleGraph.invalidateModule(module);
          if (ws) {
            ws.send({
              path,
              type: "full-reload",
            });
          }
        }
      };
      const updateVirtualModule = () => {
        const module = moduleGraph.getModuleById(resolvedVirtualModuleId);
        reloadModule(module);
      };
      watcher.on("add", () => {
        updateVirtualModule();
      });

      watcher.on("unlink", () => {
        updateVirtualModule();
      });

      watcher.on("change", async (path) => {
        const module = await moduleGraph.getModuleByUrl(path);
        reloadModule(module, path);
      });
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return ctx.virtualModule();
      }
    },
    transform(code, id) {
      const filter = createFilter(
        ctx.options.pages.include,
        ctx.options.pages.exclude
      );
      if (filter(id)) {
        const page = ctx.generatorPageCode(code, id);
        if (page) {
          return page;
        }
      }
    },
  };
};

export default VitePluginUniLayout;
