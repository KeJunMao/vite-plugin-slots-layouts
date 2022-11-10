<script lang="ts" setup>
import { ref } from "vue";

const count = ref(0);
const isCount = ref(true);
const countText = ref("count text");
const countList = ref(["count","list", count, isCount]);
const countObj = ref({});
const countInfo = {
  count,
  isCount,
  countText,
  countList,
  countObj,
};
</script>
<template>Support for <code>`v-bind`</code> </template>

<layout name="props" lang="jsonc">
{
  "v-bind": "countInfo"
}
</layout>
