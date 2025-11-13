// import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';
export const useAuth = () => {
  // const navigate = useNavigate();
  const signInWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: import.meta.env.VITE_HOST,
          queryParams: { prompt: 'select_account' },
        },
      });
      if (data.url) {
        // נודד ל־OAuth provider (supabase החזיר את כתובת ה־redirect)
        window.location.href = data.url;
      }

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
