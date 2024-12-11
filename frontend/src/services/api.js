import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

export const fetchServices = () => API.get('/services');
export const fetchServiceDetails = (id) => API.get(`/services/${id}`);
export const loginUser = (data) => API.post('/auth/login', data);
