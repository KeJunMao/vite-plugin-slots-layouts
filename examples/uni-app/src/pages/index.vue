<script lang="ts" setup>
import pageJson from "../pages.json"
const routes = pageJson.pages.filter(v=>v.style.navigationBarTitleText !== 'index')
</script>
<template>
  <div>
    Index page
  </div>
  <ul>
    <li v-for="route in routes" :key="route.path">
      <navigator :url="'/' + route.path" hover-class="navigator-hover">
        {{ route.style.navigationBarTitleText }}
				</navigator>
    </li>
  </ul>
</template>
