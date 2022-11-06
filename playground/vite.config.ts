import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Layout from "vite-plugin-uni-layout";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), Layout(), Pages()],
});
