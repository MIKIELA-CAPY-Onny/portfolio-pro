import api from './axios';

export const profileApi = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/admin/profile', data),
  uploadCV: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/admin/profile/cv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
