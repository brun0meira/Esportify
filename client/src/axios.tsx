import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5500/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthorizationHeader = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

instance.interceptors.request.use(config => {
  console.log('Sending request with headers:', config.headers);
  return config;
});

export default instance;