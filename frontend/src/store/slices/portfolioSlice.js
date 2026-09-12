import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { profileApi } from '@api/profileApi';
import { projectApi } from '@api/projectApi';
import { skillApi } from '@api/skillApi';
import { extractError } from '@utils/helpers';

export const fetchProfile = createAsyncThunk(
  'portfolio/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await profileApi.get();
      return data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'portfolio/fetchProjects',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await projectApi.getAll(params);
      return data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

export const fetchSkills = createAsyncThunk(
  'portfolio/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await skillApi.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(extractError(error));
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    profile: null,
    projects: [],
    skills: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPortfolioError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload?.profile || null;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.pending, (state) => { state.loading = true; })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload?.projects || [];
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchSkills.pending, (state) => { state.loading = true; })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload?.skills || [];
        state.loading = false;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearPortfolioError } = portfolioSlice.actions;
export default portfolioSlice.reducer;