import { supabase } from '@/lib/supabase';

export interface Message {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export const messagesService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_datetime', { ascending: false });
    
    if (error) throw error;
    return data as Message[];
  },
  
  getById: async (id: number) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Message;
  },
  
  create: async (data: Omit<Message, 'id' | 'created_datetime'>) => {
    const { data: newMessage, error } = await supabase
      .from('messages')
      .insert([{ 
        ...data, 
        created_datetime: new Date().toISOString() 
      }])
      .select()
      .single();
    
    if (error) throw error;
    return newMessage as Message;
  },
    
  update: async (id: number, data: Partial<Message>) => {
    const { data: updatedMessage, error } = await supabase
      .from('messages')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updatedMessage as Message;
  },
    
  delete: async (id: number) => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};
