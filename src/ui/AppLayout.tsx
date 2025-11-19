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
      // 1. Check Session
      const { data, error } = await supabase.auth.getSession();

      // Check if we are handling an OAuth callback (hash or query params)
      const isAuthCallback = window.location.hash.includes('access_token') ||
        window.location.hash.includes('type=recovery') ||
        window.location.search.includes('code=');

      // If no session and NOT an auth callback, redirect to login
      if ((error || !data.session) && !isAuthCallback) {
        if (location.pathname !== '/SignInOAuth') {
          navigate('/SignInOAuth');
        }
        return;
      }

      // If we are in an auth callback but no session yet, we wait.
      // Supabase will process the hash and eventually update the session.
      if (!data.session && isAuthCallback) {
        return;
      }

      // 2. If Session exists, wait for Token check
      if (data.session && user) {
        if (statusToken === 'idle' || statusToken === 'loading') {
          // Do nothing, let the loader show
          return;
        }

        if (statusToken === 'success') {
          if (isToken) {
            if (location.pathname !== '/chat') {
              navigate('/chat');
            }
          } else {
            if (location.pathname !== '/access-gmail-account') {
              navigate('/access-gmail-account');
            }
          }
        } else if (statusToken === 'failed') {
          // Fallback for failed token check
          if (location.pathname !== '/access-gmail-account') {
            navigate('/access-gmail-account');
          }
        }
      }
    };

    checkAuthAndNavigate();
  }, [user, isToken, statusToken, navigate, location.pathname]);

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
