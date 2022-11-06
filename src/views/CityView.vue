<template>
  <Suspense>
    <AsyncCityView />
    <template #falback>
      <p class="text-center text-2xl text-white">Loading city...</p>
    </template>
  </Suspense>
</template>

<script setup>
import AsyncCityView from "@/components/AsyncCityView.vue";
</script>

<style scoped></style>
