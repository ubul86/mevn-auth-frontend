import axios from 'axios';

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const privateApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

privateApi.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("Nincs érvényes token");
        }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

privateApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    },
);

export { publicApi, privateApi };
