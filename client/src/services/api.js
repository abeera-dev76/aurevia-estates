import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchProperties = (params = {}) => api.get('/properties', { params });
export const fetchProperty   = (id) => api.get(`/properties/${id}`);
export const submitInquiry   = (data) => api.post('/inquiries', data);
export const submitContact   = (data) => api.post('/contact', data);
export const bookVisit       = (data) => api.post('/visits', data);
export const sellProperty    = (data) => api.post('/sell-property', data);
export const contactAgent    = (data) => api.post('/agent-contact', data);
export const checkHealth     = ()     => api.get('/health');

export default api;
