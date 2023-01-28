import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use( (axiosRequestConfig) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    axiosRequestConfig.headers.Authorization = `Bearer ${token}`;
    return axiosRequestConfig;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {

    try {
        const {response} = error;

        if (response && response.status == 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }

        throw error;
    } catch (e) {
        throw e;
    }
    
});

export default axiosClient;