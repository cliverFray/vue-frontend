import axios from 'axios';
import { useUiStore } from '../stores/ui';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Laravel default port
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(config => {
    const uiStore = useUiStore();
    uiStore.setLoading(true);
    return config;
}, error => {
    const uiStore = useUiStore();
    uiStore.setLoading(false);
    return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(response => {
    const uiStore = useUiStore();
    uiStore.setLoading(false);
    
    // Auto-show success messages if present
    if (response.data && response.data.message && response.config.method !== 'get') {
        uiStore.addNotification(response.data.message, 'success');
    }
    
    return response;
}, error => {
    const uiStore = useUiStore();
    uiStore.setLoading(false);
    
    let message = 'Ocurrió un error inesperado';
    
    if (error.response) {
        if (error.response.data && error.response.data.message) {
            message = error.response.data.message;
            
            // Format validation errors nicely
            if (error.response.data.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                message += ': ' + errors.join(', ');
            }
        } else {
            message = `Error del servidor: ${error.response.status}`;
        }
    } else if (error.request) {
        message = 'Error de red. No se pudo conectar al servidor.';
    }
    
    uiStore.addNotification(message, 'error');
    return Promise.reject(error);
});

export default api;
