'use client';

import MessageCard from '@/components/MessageCard';
import { useMessages } from '@/hooks/queries/useMessages';
import CreateMessageForm from '@/components/CreateMessageForm';
import { Loader2 } from 'lucide-react';

export default function Feed() {
  const { messages, isLoading, error } = useMessages();

  if (error) {
    return <p>Error loading messages</p>;
  }

  function MessagesCardsWrapper() {
    return (
      <div className="flex flex-col gap-4 mt-6">
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
    );
  }

  return (
    <>
      <CreateMessageForm />
      {isLoading ? (
        <Loader2 className="animate-spin mx-auto text-codeleap-blue" />
      ) : (
        <MessagesCardsWrapper />
      )}
    </>
  );
}
