import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo.tsx';
import { UserDetails } from '../features/user/UserDetails.tsx';
import { useUser } from '../context/UserContext.tsx';
import { useEffect, useState, useRef } from 'react';
import { useTokens } from '../hooks/serviceTokens.ts';
import { supabase } from '../utils/supabase-client.ts';

export const AppLayout = () => {
  const [isToken, setIsToken] = useState<boolean>(false);
  const [statusToken, setStatusToken] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');
  const navigate = useNavigate();
  const location = useLocation();
  const { get_token } = useTokens();
  const { user } = useUser();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (!user) return;
    const fetchTokens = async () => {
      const token = await get_token(user.id, setStatusToken);
      setIsToken(token || false);
      hasNavigated.current = false;
    };
    fetchTokens();
  }, [user]);

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      if (hasNavigated.current) return;

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log('Error fetching session:', error.message);
        // if (location.pathname !== '/SignInOAuth') {
        //   hasNavigated.current = true;
        //   navigate('/SignInOAuth');
        // }
        // setIsLoading(false);
        return;
      }

      if (!data.session && location.pathname !== '/SignInOAuth') {
        hasNavigated.current = true;
        navigate('/SignInOAuth');
        return;
      }
      if (data.session && user) {
        if (statusToken === 'loading') {
        } else if (statusToken === 'success') {
          if (isToken && location.pathname !== '/chat') {
            hasNavigated.current = true;

            navigate('/chat');
          } else if (!isToken && location.pathname !== '/access-gmail-account') {
            hasNavigated.current = true;
            navigate('/access-gmail-account');
          }
        }
      }
    };
    checkAuthAndNavigate();
  }, [user, isToken, navigate, location.pathname]);

  if (statusToken === 'loading') {
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
