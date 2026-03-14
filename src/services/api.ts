import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject Bearer token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tk');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 - expired session
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tk');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
