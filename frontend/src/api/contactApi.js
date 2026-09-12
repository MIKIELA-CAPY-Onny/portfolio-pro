import api from './axios';

export const contactApi = {
  send: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/admin/contacts', { params }),
  markAsRead: (id) => api.put(`/admin/contacts/${id}/read`),
  delete: (id) => api.delete(`/admin/contacts/${id}`),
};
