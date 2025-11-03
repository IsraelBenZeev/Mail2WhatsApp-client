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
      toastId.current = toast.loading('מתחבר לשרת, אנא המתן...', {
        position: 'top-center',
        closeOnClick: true,
        rtl: true,
      });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log('data: ', data);
      console.log('error: ', error);

      if (error) {
        toast.update(toastId.current!, {
          render: error.message,
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        });
        console.log('enter to error');
        console.error('Error signing up:', error.message);
        return null;
      }

      const user = data.user;
      const createdAt = new Date(user.created_at).getTime();
      const confirmationSentAt = user.confirmation_sent_at
        ? new Date(user.confirmation_sent_at).getTime()
        : createdAt; // fallback
      const diffSeconds = (confirmationSentAt - createdAt) / 1000;

      // משתמש חדש שנרשם עכשיו
      if (!user.user_metadata.email_verified && diffSeconds <= 5) {
        toast.update(toastId.current!, {
          render: 'ברוכים הבאים! נשלח מייל לאימות, בדוק את תיבת הדואר שלך.',
          type: 'success',
          isLoading: false,
          autoClose: 4000,
        });
        // משתמש קיים שלא אושר
      } else if (!user.user_metadata.email_verified && diffSeconds > 5) {
        toast.update(toastId.current!, {
          render: 'משתמש קיים שלא אושר, נשלח מייל אימות נוסף.',
          type: 'info',
          isLoading: false,
          autoClose: 4000,
        });
        // משתמש קיים ומאושר
      } else {
        toast.update(toastId.current!, {
          render: 'מייל כבר קיים ומאומת. ניתן להתחבר כעת.',
          type: 'info',
          isLoading: false,
          autoClose: 4000,
        });
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
export const signInWithGoogle = async () => {
  console.log("pressed");
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: { prompt: 'select_account' }, // ⚡ כאן חשוב
      },
    });

    if (error) {
      console.error('Google sign-in error:', error.message);
      return;
    }

    console.log('Google sign-in data:', data);
    // data.url – כאן תוכל להפנות את המשתמש ל־redirect אם נדרש
    // data.session – מכיל את ה-token החדש
  } catch (err) {
    console.error('Unexpected error:', err);
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
