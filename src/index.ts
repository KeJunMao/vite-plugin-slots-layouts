import { resolve } from "path";
import { ModuleNode, Plugin, createFilter } from "vite";
import { resolvedVirtualModuleId, virtualModuleId } from "./constant";
import { Context } from "./context";
import { UserOptions } from "./types";
import { logger } from "./utils";

export const VitePluginUniLayout = (userOptions: UserOptions = {}): Plugin => {
  logger.debug(`Create Layout content`);
  const ctx = new Context(userOptions);
  return {
    name: "vite-plugin-uni-layout",
    enforce: "pre",
    configResolved(_config) {
      ctx.config = _config;
    },
    configureServer({ watcher, ws, moduleGraph }) {
      const dirs = ctx.options.layouts.dirs.map((dir) =>
        resolve(ctx.config.root, dir)
      );
      logger.debug(`Add watcher: ${dirs}`);
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
        logger.debug(`Update virtual module`);
        const module = moduleGraph.getModuleById(resolvedVirtualModuleId);
        reloadModule(module);
      };
      watcher.on("add", (path) => {
        updateVirtualModule();
      });

      watcher.on("unlink", (path) => {
        updateVirtualModule();
      });

      watcher.on("change", async (path) => {
        updateVirtualModule();
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
        logger.debug(`Transform: ${id}`);
        const page = ctx.generatorPageCode(code, id);
        if (page) {
          return page;
        }
      }
    },
  };
};

export default VitePluginUniLayout;
