import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_THEMOVIE,
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`
    }
});

export default api;