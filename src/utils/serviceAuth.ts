import axios from 'axios';
import { supabase } from './supabase-client';
import { addMessageAssistant } from './manageMessages';
import type { Dispatch, SetStateAction } from 'react';
import type { MessageType } from '../types/MessageType';
import type { StatusType } from '../types/StatusType';
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const signUpUser = async (
  email: string,
  password: string,
  setStatus: Dispatch<SetStateAction<StatusType>>
) => {
  try {
    setStatus('loading');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Error signing up:', error.message);
      setStatus('error');
      return null;
    }
    setStatus('success');
    return data.user;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
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
