import { useUser } from '../context/UserContext';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const useTokens = () => {
  const { user } = useUser();
  const authorize_user_and_save_tokens = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/OAuth/authorize_gmail/${user?.id}`
      );
      const auth_gmail_url = response.data.auth_url;
      console.log('auth_gmail_url: ', auth_gmail_url);
      window.location.href = auth_gmail_url;

      return response.data;
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };
  return { authorize_user_and_save_tokens };
};
