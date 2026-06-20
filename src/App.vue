<script setup>
import Loader from './components/Loader.vue';
import Notification from './components/Notification.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <Loader />
    <Notification />
    
    <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Cliver Store</span>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link to="/" class="inline-flex items-center px-1 pt-1 border-b-2 font-medium text-sm transition-colors duration-200" :class="[ $route.path === '/' ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' ]">
                Dashboard
              </router-link>
              <router-link to="/products" class="inline-flex items-center px-1 pt-1 border-b-2 font-medium text-sm transition-colors duration-200" :class="[ $route.path.includes('/products') ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' ]">
                Productos
              </router-link>
              <router-link to="/categories" class="inline-flex items-center px-1 pt-1 border-b-2 font-medium text-sm transition-colors duration-200" :class="[ $route.path.includes('/categories') ? 'border-primary text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' ]">
                Categorías
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1 max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
