# vite-plugin-slots-layouts

Vite 中 Vue 3 的基于插槽的布局系统

[English](./README.md) | 简体中文

## 安装

```bash
pnpm i -D vite-plugin-slots-layouts
```

## 使用

```ts
// vite.config.ts
import { defineConfig } from "vite";
import Layout from "vite-plugin-slots-layouts";

export default defineConfig({
  plugins: [Layout()],
});
```

在 main.ts 中需要导入生成的代码并调用 `app.use()`

```ts
// main.ts
import App from "./App.vue";
import layouts from "virtual:slots-layouts";
const app = createApp(App);

app.use(layouts);
```

## 客户端类型

```ts
/// <reference types="vite-plugin-slots-layouts/client" />
```

## 配置

查看 [types.ts](./src/types.ts)

## 布局块

使用布局块可以设置页面的布局配置

```vue
<layout name="blog" disabled>
  {
    "isPost": false
  }
</layout>
```

### 属性

- `name`: 设置布局
- `disabled`: 禁用布局

### 内容

> **Warning**
> 这个还没写好

内容是 JSON 字符串，用于设置布局属性的值

```html
<BlogLayout isPost="false"></BlogLayout>
```

## 原理

注册 layout 文件夹的组件

- blog/index.vue
  - component: `<Blog/>`
  - layout: `blog`
- blog/header-and-footer.vue
  - component: `<BlogHeaderAndFooter/>`
  - layout: `blogHeaderAndFooter`

读取页面中的 layout-block

```html
<layout name="blog"></layout>
```

替换页面的 template 并使用布局组件包裹

之前:

```html
<!-- default.vue -->
<template>
  <slot />
  <slot name="footer"> default footer </slot>
</template>
```

```html
<!-- page.vue -->
<template>page</template>
<template #footer>footer</template>
<script lang="ts" setup>
  ...
</script>
```

之后:

```html
<template>
  <DefaultLayout>
    <template #default>page</template>
    <template #footer>footer</template>
  </DefaultLayout>
</template>
<script lang="ts" setup>
  ...
</script>
```

这意味着你可以完全灵活地使用插槽 API。
