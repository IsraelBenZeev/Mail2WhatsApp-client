import axios from 'axios';
import { supabase } from './supabase-client';
import { addMessageAssistant } from './manageMessages';
import { useRef } from 'react';
import type { MessageType } from '../types/MessageType';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const useSignUpUser = () => {
  const toastId = useRef<string | number | null>(null);

  const signUpUser = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log('data: ', data);
      console.log('error: ', error);
      
      if (error) {
        console.log('enter to errror');
        console.error('Error signing up:', error.message);
        return null;
      }
      if (data.user.identities.length > 0) {
        console.log('נשלח מייל לאימות');
      } else if (data.user.identities.length === 0) {
        console.log('משתמש קיים כבר במערכת');
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      toast.update(toastId.current!, {
        render: err.message! || 'שגיאה לא צפויה. נסה שוב מאוחר יותר.',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
      return null;
    }
  };

  return { signUpUser };
};

export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error.message);
      return null;
    }
    return data.user;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
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
    const response = await axios.post<MessageType>(
      `${BASE_URL}/llm/send-message`,
      {
        message,
      }
    );
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
