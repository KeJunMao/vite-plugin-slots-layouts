# vite-plugin-slots-layouts

Slots-based layout for Vue 3 applications using Vite

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
import layouts from "virtual:uni-layout";
const app = createApp(App);

app.use(layouts);
```

## Client Types

```ts
/// <reference types="vite-plugin-slots-layouts/client" />
```

## Configuration

see [types.ts](./src/types.ts)

## How it works

Registration layout dirs components

- blog/index.vue
  - component: `<Blog/>`
  - layout: `blog`
- blog/header-and-footer.vue
  - component: `<BlogHeaderAndFooter/>`
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
  <DefaultLayout>
    <template #default>page</template>
    <template #footer>footer</template>
  </DefaultLayout>
</template>
<script lang="ts" setup>
  ...
</script>
```

That means you have the full flexibility of the slots API at your disposal.
