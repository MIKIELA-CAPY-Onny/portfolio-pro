import api from './axios';

export const projectApi = {
  getAll: (params) => api.get('/projects', {
    params
  }),

  getById: (id) => api.get(`/projects/${id}`),

  getCategories: () => api.get('/categories'),

  getTechnologies: () => api.get('/technologies'),

  create: (data) => api.post('/projects', data),

  update: (id, data) => api.put(`/projects/${id}`, data),

  delete: (id) => api.delete(`/projects/${id}`),
};