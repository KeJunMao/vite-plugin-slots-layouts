<p align="center">
  <img width="200" src="./assets/logo.svg" alt="logo of vite-plugin-slots-layouts repository">
</p>

<h2 align='center'>vite-plugin-slots-layouts</h2>

<p align="center">Slots-based layout for Vue 3 applications using Vite. <strong>WIP</strong>
</p>

English | [简体中文](./README.zhCN.md)

## Installation

```bash
pnpm i -D vite-plugin-slots-layouts
```

## Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import Layout from "vite-plugin-slots-layouts";

export default defineConfig({
  plugins: [Layout()],
});
```

In main.ts, import the generated code and call `app.use()`

```ts
// main.ts
import App from "./App.vue";
import layouts from "virtual:slots-layouts";
const app = createApp(App);

app.use(layouts);
```

## Client Types

```ts
/// <reference types="vite-plugin-slots-layouts/client" />
```

## Configuration

see [types.ts](./src/types.ts)

## Layout Block

Use layout-block to set the layout configuration of the page

```vue
<layout name="blog" disabled lang="jsonc">
{
  ":isPost": false,
  "v-bind": "obj",
  "@change": "handleLayoutChange"
}
</layout>
```

### props

- `name`: set layout
- `disabled`: disabled layout

### content

The content is JSON string, you can use the template syntax supported by Vue.

```vue
<layout-blog
  :isPost="false"
  v-bind="obj"
  @change="handleLayoutChange"
></layout-blog>
```

## How it works

Registration layout dirs components

- blog/index.vue
  - component: `<layout-blog/>`
  - layout: `blog`
- blog/header-and-footer.vue
  - component: `<layout-blog-header-and-footer/>`
  - layout: `blogHeaderAndFooter`

Read pages layout-block

```html
<layout name="blog"></layout>
```

Replace page template with wapper layout component

Before:

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

After:

```html
<template>
  <layout-default>
    <template #default>page</template>
    <template #footer>footer</template>
  </layout-default>
</template>
<script lang="ts" setup>
  ...
</script>
```

That means you have the full flexibility of the slots API at your disposal.
