<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col items-center gap-4 py-6 text-white sm:flex-row"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <font-awesome-icon icon="fa-solid fa-cloud-sun" size="3x" />
          <p class="text-2xl">Simple Weather</p>
        </div>
      </RouterLink>
      <div class="flex flex-1 justify-end gap-3">
        <font-awesome-icon icon="fa-solid fa-circle-info" size="lg" />
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped></style>
