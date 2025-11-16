import { Outlet, useNavigate } from 'react-router-dom';
import { Logo } from './Logo.tsx';
import { UserDetails } from '../features/user/UserDetails.tsx';
import { useUser } from '../context/UserContext.tsx';
import { useEffect, useState } from 'react';
import { useTokens } from '../hooks/serviceTokens.ts';
import { supabase } from '../utils/supabase-client.ts';
export const AppLayout = () => {
  const [isToken, setIsToken] = useState<boolean>(false);
  const navigate = useNavigate();
  const { get_token } = useTokens();
  const { user } = useUser();
  useEffect(() => {
    if (!user) return;
    const fetchTokens = async () => {
      setIsToken((await get_token(user.id)) || false);
    };
    fetchTokens();
  }, [user]);
  useEffect(() => {
    console.log('isToken: ', isToken);

    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log('Error fetching session:', error.message);
        navigate('/SignInOAuth');
        return;
      }
      if (!data.session) {
        navigate('/SignInOAuth');
        return;
      }
      if (!isToken) {
        navigate('/access-gmail-account');
      } else {
        navigate('/chat');
      }
    };

    fetchSession();
  }, [isToken]);

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
