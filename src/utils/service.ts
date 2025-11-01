import axios from 'axios';
import type { MessageType } from '../types/MessageType';
import { addMessageAssistant } from './manageMessages';
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const printBaseURL = () => {
  console.log('BASE_URL: ', BASE_URL);
};
export const sendMessage = async (
  message: string,
  setStatus: React.Dispatch<
    React.SetStateAction<
      'idle' | 'sending' | 'sent' | 'loading' | 'success' | 'error'
    >
  >,
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
) => {
  try {
    setStatus('loading');
    const response = await axios.post<MessageType>(`${BASE_URL}/send-message`, {
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
