import { defineConfig } from "vite";
import Uni from "@dcloudio/vite-plugin-uni";
import Layout from "vite-plugin-slots-layouts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Layout({
      useVirtualModule: false
    }),
    Uni(),
  ],
});
