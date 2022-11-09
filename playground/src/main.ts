import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import layouts from "virtual:slots-layouts";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(layouts);
app.use(router);

app.mount("#app");
