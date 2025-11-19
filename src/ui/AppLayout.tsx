import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo.tsx';
import { UserDetails } from '../features/user/UserDetails.tsx';
import { useUser } from '../context/UserContext.tsx';
import { useEffect, useState } from 'react';
import { useTokens } from '../hooks/serviceTokens.ts';
import { supabase } from '../utils/supabase-client.ts';

export const AppLayout = () => {
  const [isToken, setIsToken] = useState<boolean>(false);
  const [statusToken, setStatusToken] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { get_token } = useTokens();
  const { user } = useUser();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      try {
        // שלב 1: בדיקת Session
        const { data, error } = await supabase.auth.getSession();

        // בדיקה אם אנחנו באמצע OAuth callback
        const isAuthCallback =
          window.location.hash.includes('access_token') ||
          window.location.hash.includes('type=recovery') ||
          window.location.search.includes('code=');

        // אם אין session ולא OAuth callback - נווט להתחברות
        if ((error || !data.session) && !isAuthCallback) {
          setIsCheckingAuth(false);
          setStatusToken('idle');
          if (location.pathname !== '/SignInOAuth') {
            navigate('/SignInOAuth');
          }
          return;
        }

        // אם אנחנו ב-OAuth callback אבל עדיין אין session - נחכה
        if (!data.session && isAuthCallback) {
          setIsCheckingAuth(true);
          console.log('ממתין ל-OAuth callback להסתיים...');
          return;
        }

        // שלב 2: אם יש Session אבל אין עדיין User מה-Context - נחכה
        if (data.session && !user) {
          setIsCheckingAuth(true);
          console.log('Session קיים, ממתין ל-User מה-Context...');
          return;
        }

        // שלב 3: יש גם Session וגם User - בודקים טוקנים
        if (data.session && user) {
          // אם עדיין לא בדקנו טוקנים - נבדוק
          if (statusToken === 'idle') {
            console.log('בודק טוקנים עבור המשתמש:', user.id);
            setStatusToken('loading');
            const hasToken = await get_token(user.id, setStatusToken);
            setIsToken(hasToken || false);
            return; // נחכה ל-render הבא עם הסטטוס המעודכן
          }

          // אם אנחנו עדיין טוענים - נראה את מסך הטעינה
          if (statusToken === 'loading') {
            setIsCheckingAuth(true);
            return;
          }

          // שלב 4: בדיקת טוקנים הסתיימה - ניווט לפי התוצאות
          if (statusToken === 'success') {
            setIsCheckingAuth(false);

            if (isToken) {
              // יש טוקן - נווט לצ'אט
              console.log("נמצא טוקן, מנווט לצ'אט");
              if (location.pathname !== '/chat') {
                navigate('/chat');
              }
            } else {
              // אין טוקן - נווט לדף הרשאות Gmail
              console.log('לא נמצא טוקן, מנווט לדף הרשאות Gmail');
              if (location.pathname !== '/access-gmail-account') {
                navigate('/access-gmail-account');
              }
            }
          } else if (statusToken === 'failed') {
            // בדיקת טוקנים נכשלה - נווט לדף הרשאות
            setIsCheckingAuth(false);
            console.log('בדיקת טוקנים נכשלה, מנווט לדף הרשאות Gmail');
            if (location.pathname !== '/access-gmail-account') {
              navigate('/access-gmail-account');
            }
          }
        }
      } catch (err) {
        console.error('שגיאה בבדיקת הרשאות:', err);
        setIsCheckingAuth(false);
        setStatusToken('failed');
      }
    };

    checkAuthAndNavigate();
  }, [user, statusToken, navigate, location.pathname, get_token]);

  if (statusToken === 'loading' || isCheckingAuth) {
    return (
      <div className="flex-col gap-4 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="loader-loading"></div>
        <div className="text-white text-xl">טוען הרשאות...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-3">
      <header className="flex justify-between items-center flex-1 mb-4 w-full max-w-4xl">
        {user && <UserDetails />}
        <Logo />
      </header>
      <main className="flex-[8] w-full max-w-4xl overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};
