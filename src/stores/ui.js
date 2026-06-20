import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
    state: () => ({
        isLoading: false,
        notifications: []
    }),
    actions: {
        setLoading(status) {
            this.isLoading = status;
        },
        addNotification(message, type = 'info') {
            const id = Date.now();
            this.notifications.push({ id, message, type });
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                this.removeNotification(id);
            }, 5000);
        },
        removeNotification(id) {
            this.notifications = this.notifications.filter(n => n.id !== id);
        }
    }
});
