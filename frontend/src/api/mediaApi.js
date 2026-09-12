import api from './axios';

export const mediaApi = {
  getAll: (params) => api.get('/admin/media', { params }),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/admin/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id) => api.delete(`/admin/media/${id}`),
};
