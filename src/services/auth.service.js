import { publicApi, privateApi } from './api';

class AuthService {
    async login(user) {
        const response = await publicApi.post('/auth/login', {
            username: user.username,
            password: user.password,
        });
        if (response.data.data.token) {
            localStorage.setItem('user', response.data.data.token);
            return response.data.data.token;
        }
        return response.data.data;
    }

    async logout() {
        await privateApi.post('/auth/logout');
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

}

export default new AuthService();
