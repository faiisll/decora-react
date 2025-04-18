import {default as ax} from "axios"
const url = import.meta.env.VITE_API_URL

const configAxios = ax.create({
    baseURL: url,
    timeout: 10000
})

configAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
)

export default configAxios