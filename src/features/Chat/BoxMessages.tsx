import { useState } from 'react';
import { InputChat } from './InputChat';
import { MessageItem } from './MessageItem';
import type { MessageType } from '../../types/MessageType';
import type { StatusType } from '../../types/StatusType';

export const BoxMessages = () => {
  const [value, setValue] = useState<string>('');
  const [responseLLm, setResponseLLm] = useState<string>('');
  const [messagesOwn, setMessagesOwn] = useState<MessageType[]>([]);
  const [status, setStatus] = useState<StatusType>('idle');
  console.log('value:', value);

  return (
    <div className="flex flex-col justify-end border gap-1 border-black px-2 py-1 w-full h-screen">
      <div className='overflow-y-auto'>
        {messagesOwn.map((msg, index) => (
          <MessageItem
            key={index}
            label={msg.content}
            time={msg.time || ''}
            isOwn={msg.role === 'user'}
          />
        ))}
      </div>
      <InputChat
        value={value}
        setValue={setValue}
        setMessages={setMessagesOwn}
        setStatus={setStatus}
        status={status}
      />
    </div>
  );
};
