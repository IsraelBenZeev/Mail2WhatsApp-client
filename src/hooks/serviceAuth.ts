import { supabase } from '../utils/supabase-client';
export const signInWithProvider = async (
  provider: 'google' | 'github' | 'facebook'
) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      
      provider: provider,
      options: {
        redirectTo: 'http://localhost:5173/',
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

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('שגיאה בהתנתקות:', error.message);
  } else {
    console.log('המשתמש נותק בהצלחה');
  }
};
