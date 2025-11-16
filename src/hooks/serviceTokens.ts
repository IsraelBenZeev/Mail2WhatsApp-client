import { useUser } from '../context/UserContext';
import axios from 'axios';
import { supabase } from '../utils/supabase-client';
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const useTokens = () => {
  const { user } = useUser();
  const authorize_user_and_save_tokens = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/isr/authorize_gmail/${user?.id}`
        // `${BASE_URL}/OAuth/authorize_gmail/${user?.id}`
      );
      const auth_gmail_url = response.data.auth_url;
      console.log('auth_gmail_url: ', auth_gmail_url);
      window.location.href = auth_gmail_url;

      return response.data;
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };
  const get_token = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_tokens')
      .select('access_token')
      .eq('id', userId)
      .single();
    if (error) {
      console.error(error);
      return null;
    }
    return data?.access_token ? true : false;
  };
  return { authorize_user_and_save_tokens, get_token };
};
