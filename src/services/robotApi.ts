import axios from 'axios';

export const robotApi = axios.create({
  baseURL: 'http://192.168.1.100:5000',
});
