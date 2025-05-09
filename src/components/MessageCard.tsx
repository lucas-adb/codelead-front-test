'use client';

import userStore from '@/stores/user-store';
import { MessageCardProps } from '@/types/messages';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

function MessageCard({ message }: MessageCardProps) {
  const { username } = userStore();

  const isMessageFromUser = message.username === username;

  console.log('isMessageFromUser', isMessageFromUser);

  const timeAgo = formatDistanceToNow(new Date(message.created_datetime), {
    addSuffix: true,
    locale: enUS
  });

  return (
    <article className="border rounded-2xl border-codeleap-border overflow-hidden min-h-80">
      <header className="bg-codeleap-blue h-20 px-6 flex items-center justify-between">
        <h1 className="text-background font-bold text-2xl">{message.title} {String(isMessageFromUser)}</h1>
      </header>
      <main className="p-4 flex flex-col gap-2">
        <div className="flex justify-between text-codeleap-gray">
          <p className='font-bold'>@{message.username}</p>
          <p>{timeAgo}</p>
        </div>
        <div>
          <p>
            {message.content}
          </p>
        </div>
      </main>
    </article>
  );
}

export default MessageCard;
