// client/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (userData) => api.post('/users/login', userData)
};

// Message endpoints
export const messageAPI = {
  createMessage: (messageData) => api.post('/messages', messageData),
  getMessages: () => api.get('/messages'),
  getMessage: (id) => api.get(`/messages/${id}`),
  updateMessage: (id, messageData) => api.put(`/messages/${id}`, messageData),
  deleteMessage: (id) => api.delete(`/messages/${id}`)
};

// Upload endpoints
export const uploadAPI = {
  uploadMedia: (formData) => api.post('/upload/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

// Payment endpoints
export const paymentAPI = {
  createCheckoutSession: (plan) => api.post('/payment/create-checkout-session', { plan }),
  createSubscription: (sessionId) => api.post('/payment/create-subscription', { sessionId }),
  getSubscription: () => api.get('/payment/subscription')
};