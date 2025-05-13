import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesService, Message } from '@/services/messages';

export function useMessages() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['messages'],
    queryFn: messagesService.getAll,
    select: (messages) => {
      return [...messages].sort((a, b) => {
        return (
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime()
        );
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: messagesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Message> }) =>
      messagesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: messagesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  return {
    messages: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    createMessage: createMutation.mutate,
    updateMessage: updateMutation.mutate,
    deleteMessage: deleteMutation.mutate,
  };
}
