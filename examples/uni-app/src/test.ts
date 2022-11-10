import DefaultLayout from "/Users/kejun/Workspace/vite-plugin-uni-layout/examples/uni-app/src/layouts/default.vue";

export const layouts = {
  DefaultLayout,
};

export default {
  install(app) {
    app.component("DefaultLayout", DefaultLayout);
  },
};
