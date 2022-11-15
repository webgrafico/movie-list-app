import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 1000,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    config.params = {
      api_key: import.meta.env.VITE_API_KEY
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
