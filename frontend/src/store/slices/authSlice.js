import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '@api/authApi';
import authService from '@services/authService';
import { extractError } from '@utils/helpers';

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    const token = authService.getToken();
    const admin = authService.getAdmin();

    if (!token || !admin) return rejectWithValue('No session');

    try {
      const { data } = await authApi.me();
      return data.admin;
    } catch {
      authService.clearAll();
      return rejectWithValue('Session expired');
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login(credentials);
      authService.setToken(data.token);
      authService.setAdmin(data.admin);
      return data.admin;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

export const logoutAdmin = createAsyncThunk('auth/logout', async () => {
  try {
    await authApi.logout();
  } finally {
    authService.clearAll();
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    admin: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.admin = null;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;