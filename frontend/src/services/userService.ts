import { api } from './apiClient';

export const userService = {
  updateRole: async (role: string) => {
    const { data } = await api.put('/api/users/role', { role });
    return data;
  },
  updatePlan: async (plan: string) => {
    const { data } = await api.put('/api/users/plan', { plan });
    return data;
  },
  updateProfile: async (payload: Record<string, unknown>) => {
    const { data } = await api.put('/api/users/profile', payload);
    return data;
  },
};

