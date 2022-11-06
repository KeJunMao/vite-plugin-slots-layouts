<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>post content page {{ route.params.id }}</template>
<template #header>
  <RouterLink to="/">Home</RouterLink>
  |
  <RouterLink to="/blog">Blog</RouterLink>
</template>
<template #footer>post content footer</template>
