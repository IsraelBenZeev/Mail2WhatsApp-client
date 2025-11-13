import { useEffect, useState, useRef } from 'react';
import { InputChat } from './InputChat';
import { MessageItem } from './MessageItem';
import type { MessageType } from '../../types/MessageType';
import type { StatusType } from '../../types/StatusType';
import { getMessages } from '../../utils/service';
import { useUser } from '../../context/UserContext';

export const BoxMessages = () => {
  const [value, setValue] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [status, setStatus] = useState<StatusType>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (!user) return;
    const fetchMessages = async () => {
      await getMessages(user?.id,setMessages);
    };
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
      <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <MessageItem
              key={index}
              label={msg.content}
              time={msg.time || ''}
              isOwn={msg.role === 'user'}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t border-gray-200 bg-white px-4 py-3 shadow-lg flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <InputChat
            value={value}
            setValue={setValue}
            setMessages={setMessages}
            setStatus={setStatus}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};
