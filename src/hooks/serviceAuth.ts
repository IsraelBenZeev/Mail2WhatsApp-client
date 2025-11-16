// import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';
export const useAuth = () => {
  // const navigate = useNavigate();
  const signInWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          // redirectTo: import.meta.env.VITE_BASE_API_URL + '/Auth/signin-callback',
          redirectTo: `${import.meta.env.VITE_HOST}`,
        },
      });

      if (error) {
        console.error('sign-in error:', error.message);
        return;
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      return;
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
