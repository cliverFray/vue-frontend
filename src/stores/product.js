import { defineStore } from 'pinia';
import api from '../services/api';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        currentProduct: null
    }),
    actions: {
        async fetchProducts() {
            try {
                const response = await api.get('/products');
                this.products = response.data.data;
            } catch (error) {
                console.error("Error fetching products", error);
            }
        },
        async fetchProduct(id) {
            try {
                const response = await api.get(`/products/${id}`);
                this.currentProduct = response.data.data;
                return this.currentProduct;
            } catch (error) {
                console.error("Error fetching product", error);
                return null;
            }
        },
        async createProduct(data) {
            const response = await api.post('/products', data);
            this.products.push(response.data.data);
            return response.data;
        },
        async updateProduct(id, data) {
            const response = await api.put(`/products/${id}`, data);
            const index = this.products.findIndex(p => p.id === id);
            if (index !== -1) {
                this.products[index] = response.data.data;
            }
            return response.data;
        },
        async deleteProduct(id) {
            await api.delete(`/products/${id}`);
            this.products = this.products.filter(p => p.id !== id);
        }
    }
});
