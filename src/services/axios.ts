import axios from 'axios';

// import { PathLike } from 'fs';
// import * as qs from 'qs';

// const token =
// 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmEyY2RhM2EzMWUwZDdiZjBmZTM4OTM1NjRiNmE2MiIsInN1YiI6IjU4YTg2MjExYzNhMzY4NjY0MTAwOTA5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KVwQ6hZCYBdIE6sLEAR-npNw-BsrHOEPPVDqaenF3wM';

const API_KEY = 'c2a2cda3a31e0d7bf0fe3893564b6a62';

const api = axios.create({
  // baseURL: 'https://api.themoviedb.org/4',
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    // common: { Authorization: `Bearer ${token}` },
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
