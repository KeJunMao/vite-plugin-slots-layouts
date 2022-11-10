<script lang="ts" setup>
const emit = defineEmits<{
  (event: "change"): void;
}>();
</script>
<template>
  <div>
    <div>
      <button @click="emit('change')">emit change</button>
    </div>
    <slot />
  </div>
</template>
