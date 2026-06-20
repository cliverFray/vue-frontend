<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-8">
      <router-link to="/products" class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors mb-4">
        <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Volver a Productos
      </router-link>
      <h1 class="text-3xl font-bold text-gray-900">{{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}</h1>
    </div>

    <div class="bg-white rounded-2xl shadow-sm ring-1 ring-black ring-opacity-5 overflow-hidden">
      <form @submit.prevent="saveProduct" class="p-8 space-y-6">
        
        <!-- Nombre -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre del Producto *</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input type="text" id="name" v-model="form.name" required class="block w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm border p-2.5 transition-colors" placeholder="Ej. Camiseta Oversize">
          </div>
        </div>

        <!-- Categoría -->
        <div>
          <label for="category_id" class="block text-sm font-medium text-gray-700">Categoría *</label>
          <select id="category_id" v-model="form.category_id" required class="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-lg border transition-colors">
            <option value="" disabled>Seleccione una categoría</option>
            <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Descripción -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
          <div class="mt-1">
            <textarea id="description" v-model="form.description" rows="4" class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-lg border p-2.5 transition-colors"></textarea>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <!-- Precio -->
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Precio *</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">$</span>
              </div>
              <input type="number" step="0.01" min="0" id="price" v-model="form.price" required class="focus:ring-primary focus:border-primary block w-full pl-7 sm:text-sm border-gray-300 rounded-lg border p-2.5 transition-colors" placeholder="0.00">
            </div>
          </div>

          <!-- Stock -->
          <div>
            <label for="stock" class="block text-sm font-medium text-gray-700">Stock Inicial *</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input type="number" step="1" min="0" id="stock" v-model="form.stock" required class="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-lg border p-2.5 transition-colors" placeholder="0">
            </div>
          </div>
        </div>

        <div class="pt-5 flex justify-end">
          <router-link to="/products" class="bg-white py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
            Cancelar
          </router-link>
          <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
            {{ isEditing ? 'Guardar Cambios' : 'Crear Producto' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import { useCategoryStore } from '../stores/category';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const categoryStore = useCategoryStore();

const isEditing = computed(() => !!route.params.id);
const form = ref({
  name: '',
  description: '',
  category_id: '',
  price: '',
  stock: 0
});

onMounted(async () => {
  // Asegurar que tenemos las categorías
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories();
  }

  if (isEditing.value) {
    const product = await productStore.fetchProduct(route.params.id);
    if (product) {
      form.value = {
        name: product.name,
        description: product.description || '',
        category_id: product.category_id,
        price: product.price,
        stock: product.stock
      };
    } else {
      router.push('/products');
    }
  }
});

const saveProduct = async () => {
  let success = false;
  if (isEditing.value) {
    const res = await productStore.updateProduct(route.params.id, form.value);
    success = res?.success;
  } else {
    const res = await productStore.createProduct(form.value);
    success = res?.success;
  }
  
  if (success) {
    router.push('/products');
  }
};
</script>
