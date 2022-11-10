<script setup lang="ts">
import { ref } from "vue";

const changeCount = ref(0);
const handleChange = () => changeCount.value++;
</script>
<template>
  Support for binding events.
  <div>changeCount: {{ changeCount }}</div>
</template>

<layout name="events" lang="jsonc">
{
  "@change": "handleChange"
}
</layout>
