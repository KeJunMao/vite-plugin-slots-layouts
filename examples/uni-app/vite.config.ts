import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Layout from "vite-plugin-slots-layouts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Layout(), uni()],
});
