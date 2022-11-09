<template>
  <div>
    <header>
      <slot name="header">header</slot>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer">footer</slot>
    </footer>
  </div>
</template>
