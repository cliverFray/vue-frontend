<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    <TransitionGroup name="toast">
      <div 
        v-for="notification in uiStore.notifications" 
        :key="notification.id"
        class="pointer-events-auto flex items-center gap-3 p-4 min-w-[300px] rounded-xl shadow-lg backdrop-blur-md text-white font-medium transform transition-all duration-300"
        :class="{
          'bg-green-500/90 border border-green-400': notification.type === 'success',
          'bg-red-500/90 border border-red-400': notification.type === 'error',
          'bg-blue-500/90 border border-blue-400': notification.type === 'info'
        }"
      >
        <span class="flex-1">{{ notification.message }}</span>
        <button @click="uiStore.removeNotification(notification.id)" class="text-white/80 hover:text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useUiStore } from '../stores/ui';
const uiStore = useUiStore();
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
