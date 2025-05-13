'use client';

import MessageCard from '@/components/MessageCard';
import { useMessages } from '@/hooks/queries/useMessages';
import CreateMessageForm from '@/components/CreateMessageForm';
import { Loader2 } from 'lucide-react';

export default function Feed() {
  const { messages, isLoading, error } = useMessages();


  if (isLoading) {
    return (
      <div className='flex-1 h-full flex items-center justify-center'>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p>Error loading messages</p>;
  }

  return (
    <>
      <CreateMessageForm />
      <div className="flex flex-col gap-4 mt-6">
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
    </>
  );
}
