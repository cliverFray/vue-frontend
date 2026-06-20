<template>
  <div>
    <div class="sm:flex sm:items-center mb-8">
      <div class="sm:flex-auto">
        <h1 class="text-3xl font-bold text-gray-900">Categorías</h1>
        <p class="mt-2 text-sm text-gray-700">Administra las categorías de tus productos.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button @click="openModal(null)" class="inline-flex items-center justify-center rounded-xl border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto transition-colors">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Nueva Categoría
        </button>
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
              <th scope="col" class="px-3 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Descripción</th>
              <th scope="col" class="relative py-4 pl-3 pr-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-transparent">
            <tr v-for="category in categoryStore.categories" :key="category.id" class="hover:bg-blue-50/50 transition-colors duration-200 group">
              <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-semibold text-gray-900">{{ category.id }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-800">{{ category.name }}</td>
              <td class="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{{ category.description || '-' }}</td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                <button @click="openModal(category)" class="text-primary hover:text-blue-900 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Editar</button>
                <button @click="confirmDelete(category.id)" class="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Eliminar</button>
              </td>
            </tr>
            <tr v-if="categoryStore.categories.length === 0">
              <td colspan="4" class="py-12 text-center text-sm text-gray-500">
                <div class="flex flex-col items-center justify-center">
                  <svg class="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p>No hay categorías registradas.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500/75 backdrop-blur-sm"></div>
        </div>
        <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
        <div class="inline-block transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <form @submit.prevent="saveCategory">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">{{ form.id ? 'Editar Categoría' : 'Nueva Categoría' }}</h3>
              <div class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Nombre *</label>
                  <input type="text" id="name" v-model="form.name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                </div>
                <div>
                  <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea id="description" v-model="form.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"></textarea>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="submit" class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                Guardar
              </button>
              <button type="button" @click="closeModal" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '../stores/category';

const categoryStore = useCategoryStore();
const isModalOpen = ref(false);
const form = ref({ id: null, name: '', description: '' });

onMounted(() => {
  categoryStore.fetchCategories();
});

const openModal = (category = null) => {
  if (category && category.id) {
    form.value = { ...category };
  } else {
    form.value = { id: null, name: '', description: '' };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveCategory = async () => {
  if (form.value.id) {
    await categoryStore.updateCategory(form.value.id, form.value);
  } else {
    await categoryStore.createCategory(form.value);
  }
  closeModal();
};

const confirmDelete = async (id) => {
  if (confirm('¿Estás seguro de eliminar esta categoría?')) {
    await categoryStore.deleteCategory(id);
  }
};
</script>
