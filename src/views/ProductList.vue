<template>
  <div>
    <div class="sm:flex sm:items-center mb-8">
      <div class="sm:flex-auto">
        <h1 class="text-3xl font-bold text-gray-900">Productos</h1>
        <p class="mt-2 text-sm text-gray-700">Listado completo del inventario de la tienda.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link to="/products/create" class="inline-flex items-center justify-center rounded-xl border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto transition-colors">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Nuevo Producto
        </router-link>
      </div>
    </div>

    <!-- Table -->
    <div class="mt-8">
      <div class="overflow-hidden shadow-lg ring-1 ring-black/5 sm:rounded-2xl bg-white/80 backdrop-blur-xl">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100/50">
            <tr>
              <th scope="col" class="py-4 pl-6 pr-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-3 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" class="px-3 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
              <th scope="col" class="px-3 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio</th>
              <th scope="col" class="px-3 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
              <th scope="col" class="relative py-4 pl-3 pr-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-transparent">
            <tr v-for="product in productStore.products" :key="product.id" class="hover:bg-blue-50/50 transition-colors duration-200 group">
              <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-semibold text-gray-900">{{ product.id }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-800">{{ product.name }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100/80 text-gray-700 border border-gray-200">
                  {{ product.category ? product.category.name : 'N/A' }}
                </span>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-700">${{ parseFloat(product.price).toFixed(2) }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm font-bold">
                <span :class="[product.stock > 10 ? 'text-emerald-600' : (product.stock > 0 ? 'text-amber-500' : 'text-red-600')]">
                  {{ product.stock }}
                </span>
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                <router-link :to="`/products/${product.id}/edit`" class="text-primary hover:text-blue-900 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Editar</router-link>
                <button @click="confirmDelete(product.id)" class="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Eliminar</button>
              </td>
            </tr>
            <tr v-if="productStore.products.length === 0">
              <td colspan="6" class="py-12 text-center text-sm text-gray-500">
                <div class="flex flex-col items-center justify-center">
                  <svg class="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p>No hay productos registrados.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/product';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});

const confirmDelete = async (id) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    await productStore.deleteProduct(id);
  }
};
</script>
