import { defineStore } from 'pinia';
import AuthService from '../services/auth.service';
import RegistrationService from '../services/registration.service';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: !!localStorage.getItem('token'),
        user: null,
    }),
    actions: {
        async login(user) {
            try {
                this.user = await AuthService.login(user);
                this.isAuthenticated = true;
            } catch (error) {
                console.error('Login failed', error);
                throw error;
            }
        },
        async registration(user) {
            try {
                await RegistrationService.registration(user);
            } catch (error) {
                console.error('Registration failed', error);
                throw error;
            }
        },
        async activate(token) {
            try {
                await RegistrationService.activation(token);
            } catch (error) {
                console.error('Activation failed', error);
                throw error;
            }
        },
        logout() {
            AuthService.logout();
            this.isAuthenticated = false;
            this.user = null;
        },
    },
});
