<script lang="ts" setup>
import { useRouter } from "vue-router";

const routes = useRouter()
  .getRoutes()
  .filter((v) => v.name !== "index");
</script>
<template>
  Index page
  <ul>
    <li v-for="route in routes">
      <RouterLink :to="route.path">{{ route.name }}</RouterLink>
    </li>
  </ul>
</template>
