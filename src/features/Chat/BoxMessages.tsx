import { useState } from 'react';
import { InputChat } from './InputChat';
import { MessageItem } from './MessageItem';

export const BoxMessages = () => {
  const [value, setValue] = useState<string>('');
  const [messages, setMessages] = useState<
    { label: string; time: string; isOwn: boolean }[]
  >([]);
  console.log('value:', value);
  return (
    <div className="flex flex-col justify-end border gap-1 border-black px-2 py-1 w-full h-screen">
      <div>
        {messages.map((msg, index) => (
          <MessageItem
            key={index}
            label={msg.label}
            time={msg.time}
            isOwn={msg.isOwn}
          />
        ))}
      </div>
      <InputChat value={value} setValue={setValue} setMessages={setMessages} />
    </div>
  );
};
