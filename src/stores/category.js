import { defineStore } from 'pinia';
import api from '../services/api';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        currentCategory: null
    }),
    actions: {
        async fetchCategories() {
            try {
                const response = await api.get('/categories');
                this.categories = response.data.data;
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        },
        async createCategory(data) {
            const response = await api.post('/categories', data);
            this.categories.push(response.data.data);
            return response.data;
        },
        async updateCategory(id, data) {
            const response = await api.put(`/categories/${id}`, data);
            const index = this.categories.findIndex(c => c.id === id);
            if (index !== -1) {
                this.categories[index] = response.data.data;
            }
            return response.data;
        },
        async deleteCategory(id) {
            await api.delete(`/categories/${id}`);
            this.categories = this.categories.filter(c => c.id !== id);
        }
    }
});
