import api from './axios';

export const educationApi = {
  getAll: (params) => api.get('/educations', { params }),
  getById: (id) => api.get(`/educations/${id}`),
  create: (data) => api.post('/educations', data),
  update: (id, data) => api.put(`/educations/${id}`, data),
  delete: (id) => api.delete(`/educations/${id}`),
};
