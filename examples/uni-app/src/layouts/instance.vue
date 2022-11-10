<script lang="ts" setup>
import { ref } from "vue";

const count = ref(0);
const add = () => count.value++;

defineExpose({
  count,
  add,
});
</script>
<template>
  <div>
    <div>Layout count: {{ count }}</div>

    <slot />
  </div>
</template>
