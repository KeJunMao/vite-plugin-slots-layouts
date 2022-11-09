<script lang="ts" setup>
import Layout from "../layouts/Instance.vue";
import { ref } from "vue";

const layout = ref<InstanceType<typeof Layout> | null>(null);

</script>
<template>
  <div>Support for get layout instance</div>
  <div>
    <button @click="layout?.add">add</button>
  </div>
</template>

<layout name="instance"></layout>
