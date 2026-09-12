import api from './axios';

export const dashboardApi = {
  getStats: () => api.get('/admin/dashboard'),
  clearLogs: () => api.delete('/admin/logs'),
};
