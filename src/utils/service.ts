import axios from 'axios';
import { addMessageAssistant } from '../utils/manageMessages';
import type { MessageType } from '../types/MessageType';
import type { Dispatch } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const sendMessage = async (
  message: string,
  setStatus: React.Dispatch<
    React.SetStateAction<'idle' | 'sending' | 'sent' | 'loading' | 'success' | 'error'>
  >,
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
  userId?: string
) => {
  try {
    setStatus('loading');
    const response = await axios.post<MessageType>(`${BASE_URL}/llm/ask-llm/${userId}`, {
      message,
    });
    setStatus('success');
    addMessageAssistant(
      setMessages,
      response.data.content,
      response.data.time || new Date().toLocaleTimeString()
    );
    console.log('Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    setStatus('error');
    console.error('Error sending message:', error);
  }
};
export const getMessages = async (
  userId: string,
  setMessages: Dispatch<React.SetStateAction<MessageType[]>>,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const response = await axios.get<MessageType[]>(`${BASE_URL}/llm/get-messages/${userId}`);
    console.log('Fetched messages successfully:', response.data);
    setIsLoading(false);
    setMessages(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};
