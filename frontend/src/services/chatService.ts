import { api } from './apiClient';

export type ChatMessage = {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export const chatService = {
  fetchHistory: async (): Promise<{ history: ChatMessage[] }> => {
    const { data } = await api.get('/api/chat');
    return data;
  },
  sendMessage: async (message: string) => {
    const { data } = await api.post('/api/chat', { message });
    return data;
  },
};

