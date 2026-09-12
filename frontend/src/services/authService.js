import { TOKEN_KEY, ADMIN_KEY } from '@utils/constants';

const authService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),

  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),

  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  getAdmin: () => {
    const admin = localStorage.getItem(ADMIN_KEY);
    return admin ? JSON.parse(admin) : null;
  },

  setAdmin: (admin) => localStorage.setItem(ADMIN_KEY, JSON.stringify(admin)),

  removeAdmin: () => localStorage.removeItem(ADMIN_KEY),

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),

  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  },
};

export default authService;