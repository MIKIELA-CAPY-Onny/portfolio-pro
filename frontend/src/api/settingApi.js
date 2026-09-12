import api from './axios';

export const settingApi = {
  get: () => api.get('/settings'),
  update: (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });
    return api.put('/admin/settings', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
