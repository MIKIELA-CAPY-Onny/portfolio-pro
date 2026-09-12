import { createContext, useCallback, useEffect, useReducer } from 'react';
import { authApi } from '@api/authApi';
import authService from '@services/authService';
import { extractError } from '@utils/helpers';

const initialState = {
  admin: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESTORE_SESSION: 'RESTORE_SESSION',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        isLoading: false,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case AUTH_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = authService.getToken();
      const admin = authService.getAdmin();

      if (token && admin) {
        try {
          await authApi.me();
          dispatch({ type: AUTH_ACTIONS.RESTORE_SESSION, payload: admin });
        } catch {
          authService.clearAll();
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    restoreSession();
  }, []);

  const login = useCallback(async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    try {
      const { data } = await authApi.login(credentials);
      authService.setToken(data.token);
      authService.setAdmin(data.admin);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: data.admin });
      return { success: true };
    } catch (error) {
      const message = extractError(error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: message });
      return { success: false, message };
    }
  }, []);

  const logout = useCallback(async () => {
    authService.clearAll();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};