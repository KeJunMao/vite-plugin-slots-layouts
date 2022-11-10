<script lang="ts" setup>
import { ref } from "vue";

const count = ref(0);
const isCount = ref(true);
const countText = ref("count text");
const countList = ref(["count","list", count, isCount]);
const countObj = ref({});
</script>
<template>Support for binding props.</template>

<layout name="props" lang="jsonc">
{
  ":count": "count",
  ":isCount": "isCount",
  ":countText": "countText",
  ":countList": "countList",
  ":countObj": "countObj"
}
</layout>
