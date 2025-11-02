import type { FC } from 'react';
type MessageItemProps = {
  label: string;
  time: string;
  isOwn: boolean;
};
export const MessageItem: FC<MessageItemProps> = ({ label, time, isOwn }) => {
  return (
    <div
      className={`border bg-blue-primary px-1 rounded-br-lg rounded-bl-lg ${isOwn ? 'rounded-tr-lg rounded-tl-none' : 'rounded-tl-lg rounded-tr-none'}`}
    >
      <p className="text-xs text-white">{label}</p>
      <p className="text-xs text-white">{time}</p>
    </div>
  );
};
