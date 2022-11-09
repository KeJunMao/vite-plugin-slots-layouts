import { createSSRApp } from "vue";
import App from "./App.vue";
import "virtual:slots-layouts";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
