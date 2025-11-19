import { api } from './apiClient';

export const authService = {
  register: async (payload: { username: string; email: string; password: string }) => {
    const { data } = await api.post('/api/auth/register', payload);
    return data;
  },
  login: async (payload: { email: string; password: string }) => {
    const { data } = await api.post('/api/auth/login', payload);
    return data;
  },
  forgotPassword: async (payload: { email: string; newPassword: string }) => {
    const { data } = await api.post('/api/auth/forgot-password', payload);
    return data;
  },
  me: async () => {
    const { data } = await api.get('/api/auth/me');
    return data;
  },
};

