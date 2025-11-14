// import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';
export const useAuth = () => {
  // const navigate = useNavigate();
  const signInWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
    console.log('import.meta.env.VITE_HOST_URL: ', import.meta.env.VITE_HOST_URL);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: import.meta.env.VITE_HOST_URL,
          // redirectTo: import.meta.env.VITE_HOST_URL + '/auth/signin-callback',
          // redirectTo: "http://localhost:5173/auth/'wellback",
          queryParams: { prompt: 'select_account' },
        },
      });

      if (error) {
        console.error('sign-in error:', error.message);
        return;
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('שגיאה בהתנתקות:', error.message);
    } else {
      console.log('המשתמש נותק בהצלחה');
    }
  };
  return { signInWithProvider, signOut };
};
