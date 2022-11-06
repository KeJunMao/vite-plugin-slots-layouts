<template>
  <div>
    <h1>Blog layout</h1>
    <slot />
    <li v-for="i in 10">
      <RouterLink :to="`blog/${i}`">post {{ i }}</RouterLink>
    </li>
  </div>
</template>
