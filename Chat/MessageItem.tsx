import { FC } from 'react';
type MessageItemProps = {
  label: string;
  time: string;
  isOwn: boolean;
};
export const MessageItem: FC<MessageItemProps> = ({ label, time, isOwn }) => {
  return <div>MessageItem</div>;
};
