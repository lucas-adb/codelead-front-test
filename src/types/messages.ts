export type Message = {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
};

export type MessageCardProps = {
  message: Message;
};