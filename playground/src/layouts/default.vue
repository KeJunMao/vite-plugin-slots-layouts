<template>
  <div>
    <header>
      <slot name="header">
        <RouterLink to="/blog"> Blog </RouterLink>
      </slot>
    </header>
    <main>
      <h1>default layout</h1>
      <slot />
    </main>
    <footer>
      <slot name="footer"> default layout footer </slot>
    </footer>
  </div>
</template>
