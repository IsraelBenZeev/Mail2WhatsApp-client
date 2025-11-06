import axios from 'axios';
import { supabase } from '../utils/supabase-client';
import { addMessageAssistant } from '../utils/manageMessages';
import type { MessageType } from '../types/MessageType';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const useAuth = () => {
  // const { user, initCurrentUser } = useUser();
  const signInWithProvider = async (
    provider: 'google' | 'github' | 'facebook'
  ) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: "http://localhost:5173/chat",
          queryParams: { prompt: 'select_account' },
        },
      });

      if (error) {
        console.error('sign-in error:', error.message);
        return;
      }
      
      // console.log("data: ", data);
      // initCurrentUser();

      // data.url – כאן תוכל להפנות את המשתמש ל־redirect אם נדרש
      // data.session – מכיל את ה-token החדש
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };
  return { signInWithProvider };
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
