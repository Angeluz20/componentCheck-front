import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data?.error?.message || 'Erro desconhecido';
      
      console.error(`HTTP Error ${status}: ${errorMessage}`);
      throw new Error(errorMessage);
    } else if (error.request) {
      console.error('Network Error:', error.message);
      throw new Error('Erro de conexão com o servidor');
    } else {
      console.error('Request Error:', error.message);
      throw error;
    }
  }
);

export default httpClient;