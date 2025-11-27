import { supabase } from '../utils/supabase-client';
export const useAuth = () => {
  const signInWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
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
    try {
      // התנתקות מ-Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('שגיאה בהתנתקות:', error.message);
        throw error;
      }

      // ניקוי מפורש של כל מפתחות Supabase מה-localStorage
      // זה חשוב במיוחד לדפדפנים במובייל
      const supabaseKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
          supabaseKeys.push(key);
        }
      }
      
      // מחק את כל המפתחות של Supabase
      supabaseKeys.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          console.warn(`לא הצלחתי למחוק מפתח ${key}:`, e);
        }
      });

      // ניקוי נוסף של sessionStorage (למקרה ש-Supabase משתמש בו)
      try {
        const sessionKeys: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
            sessionKeys.push(key);
          }
        }
        sessionKeys.forEach((key) => {
          try {
            sessionStorage.removeItem(key);
          } catch (e) {
            console.warn(`לא הצלחתי למחוק מפתח session ${key}:`, e);
          }
        });
      } catch (e) {
        console.warn('שגיאה בניקוי sessionStorage:', e);
      }

      console.log('המשתמש נותק בהצלחה וכל הנתונים נמחקו');
    } catch (err) {
      console.error('שגיאה בהתנתקות:', err);
      // גם במקרה של שגיאה, ננסה לנקות את ה-localStorage
      try {
        const allKeys = Object.keys(localStorage);
        allKeys.forEach((key) => {
          if (key.startsWith('sb-') || key.includes('supabase')) {
            localStorage.removeItem(key);
          }
        });
      } catch (e) {
        console.error('שגיאה בניקוי localStorage:', e);
      }
      throw err;
    }
  };
  return { signInWithProvider, signOut };
};
