import { api } from './api';

export interface Message {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export const messagesService = {
  getAll: () => api<Message[]>('/messages'),
  
  getById: (id: number) => api<Message>(`/messages/${id}`),
  
  create: (data: Omit<Message, 'id' | 'created_datetime'>) => 
    api<Message>('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...data, 
        created_datetime: new Date().toISOString() 
      }),
    }),
    
  update: (id: number, data: Partial<Message>) =>
    api<Message>(`/messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
    
  delete: (id: number) =>
    api<void>(`/messages/${id}`, { method: 'DELETE' }),
};
