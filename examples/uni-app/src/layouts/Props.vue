<script lang="ts" setup>
import { getCurrentInstance } from "vue";

defineProps<{
  count: string;
  isCount: boolean;
  countText: string;
  countList: string[];
  countObj: Record<string, any>;
}>();

const current = getCurrentInstance();
</script>
<template>
  <div>
    <pre style="text-align: left">{{ current?.props }}</pre>
    <slot />
  </div>
</template>
