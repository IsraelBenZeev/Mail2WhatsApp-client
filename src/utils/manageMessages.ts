import type { MessageType } from '../types/MessageType';

export const addMessageAssistant = (
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
  responseLLm: string,
  time: string
) => {
  setMessages((prevMessages) => [
    ...prevMessages,
    {
      role: 'assistant',
      content: responseLLm,
      time: time,
    },
  ]);
};
