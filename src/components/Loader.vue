<template>
  <div v-if="uiStore.isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm transition-all duration-300">
    <div class="relative flex items-center justify-center">
      <div class="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin"></div>
      <div class="absolute w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '../stores/ui';
const uiStore = useUiStore();
</script>
