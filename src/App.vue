<script setup>
import { RouterView } from "vue-router";
import SiteNav from "@/components/SiteNav.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <SiteNav />
    <RouterView />
  </div>
</template>

<style></style>
