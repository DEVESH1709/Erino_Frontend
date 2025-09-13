import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.React_App_API_URL,
    withCredentials: true,
})

export default api;