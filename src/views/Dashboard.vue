<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Bienvenido a <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">FS Store</span></h1>
      <p class="text-lg text-gray-500 max-w-2xl">Gestione sus productos y categorías con una interfaz moderna y rápida.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Productos</h2>
        </div>
        <p class="text-gray-600 mb-6">Administre el inventario completo, precios y stock disponible de todos los artículos de la tienda.</p>
        <router-link to="/products" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-700 transition-colors">
          Gestionar Productos
        </router-link>
      </div>

      <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4 mb-4">
          <div class="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800">Categorías</h2>
        </div>
        <p class="text-gray-600 mb-6">Organice sus productos en diferentes categorías para facilitar la navegación a sus clientes.</p>
        <router-link to="/categories" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-secondary hover:bg-emerald-600 transition-colors">
          Gestionar Categorías
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
