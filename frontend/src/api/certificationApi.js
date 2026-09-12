import api from './axios';

export const certificationApi = {
  getAll: (params) => api.get('/certifications', { params }),
  getById: (id) => api.get(`/certifications/${id}`),
  create: (data) => api.post('/certifications', data),
  update: (id, data) => api.put(`/certifications/${id}`, data),
  delete: (id) => api.delete(`/certifications/${id}`),
};
