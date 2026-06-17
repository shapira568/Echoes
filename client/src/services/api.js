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
  login: (userData) => api.post('/users/login', userData),
  googleAuth: (googleData) => api.post('/users/google', googleData)
};

// Message endpoints
export const messageAPI = {
  createMessage: (messageData) => api.post('/messages', messageData),
  getAIStatus: () => api.get('/messages/ai-status'),
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
  createSubscription: (reference) => api.post('/payment/create-subscription', { reference }),
  getSubscription: () => api.get('/payment/subscription')
};

export const legacyContactAPI = {
  createContact: (contactData) => api.post('/legacy-contacts', contactData),
  getContacts: () => api.get('/legacy-contacts')
};

export const adminAPI = {
  getOverview: () => api.get('/admin/overview'),
  getLogs: () => api.get('/admin/logs')
};

// Mental health endpoints
export const mentalHealthAPI = {
  logMood: (moodData) => api.post('/mood/log', moodData),
  getMoodHistory: () => api.get('/mood/history'),
  getMoodStats: () => api.get('/mood/stats'),
  createJournal: (journalData) => api.post('/journals', journalData),
  getJournals: () => api.get('/journals'),
  createSymptom: (symptomData) => api.post('/symptoms', symptomData),
  getSymptoms: () => api.get('/symptoms'),
  createTrigger: (triggerData) => api.post('/triggers', triggerData),
  getTriggers: () => api.get('/triggers'),
  createMedication: (medicationData) => api.post('/medications', medicationData),
  getMedications: () => api.get('/medications'),
  createGoal: (goalData) => api.post('/goals', goalData),
  getGoals: () => api.get('/goals'),
  createReport: (reportData) => api.post('/reports', reportData),
  getReports: () => api.get('/reports'),
  createEmergencyContact: (contactData) => api.post('/emergency-contacts', contactData),
  getEmergencyContacts: () => api.get('/emergency-contacts'),
  createTherapist: (therapistData) => api.post('/therapists', therapistData),
  getTherapists: () => api.get('/therapists'),
  createSession: (sessionData) => api.post('/sessions', sessionData),
  getSessions: () => api.get('/sessions'),
  createReminder: (reminderData) => api.post('/reminders', reminderData),
  getReminders: () => api.get('/reminders')
};
