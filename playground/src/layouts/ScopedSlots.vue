<script lang="ts" setup>
import { ref } from "vue";
const text = ref("this text from layout");
</script>

<template>
  <div>
    <slot :text="text"></slot>
  </div>
</template>
