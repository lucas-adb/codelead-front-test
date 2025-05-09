import CreateMessageForm from '@/components/CreateMessageForm';
import MessageCard from '@/components/MessageCard';
import { messagesMock } from '@/mocks/messages-mock';

export default function Feed() {
  return (
    <main className='w-full'>
      <header className="bg-codeleap-blue h-20 px-6 flex items-center justify-between">
        <h1 className="text-background font-bold text-2xl">CodeLeap Network</h1>
      </header>
      <div className="bg-background flex-1 p-6">
        <CreateMessageForm />
        <div className='flex flex-col gap-4 mt-6'>
          {messagesMock.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      </div>
    </main>
  );
}
