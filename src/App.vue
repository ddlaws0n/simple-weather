<script setup>
import { RouterView } from "vue-router";
import SiteNav from "@/components/SiteNav.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <SiteNav />
    <router-view v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
