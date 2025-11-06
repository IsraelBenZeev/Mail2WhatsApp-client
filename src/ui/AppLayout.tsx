import { Outlet } from 'react-router-dom';
import { Logo } from './Logo.tsx';
import { UserDetails } from '../features/user/UserDetails.tsx';
import { ButtonAccess } from '../features/user/ButtonAccess.tsx';
import { useUser } from '../context/UserContext.tsx';
import { useTokens } from '../hooks/serviceTokens.ts';
import { useEffect, useRef, useState } from 'react';
export const AppLayout = () => {
  const [isToken, setIsToken] = useState<boolean>(false);
  const { user } = useUser();
  const { get_token } = useTokens();
  useEffect(() => {
    if (!user) return;
    console.log("user: ",user);
    
    const fetchTokens = async () => {
      setIsToken((await get_token(user.id)) || false);
      console.log("isToken: ", isToken);
    };
    fetchTokens();
  }, [user]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-3">
      <header className="flex justify-between items-center flex-1 mb-4 w-full max-w-4xl">
        {user && <UserDetails />}
        <Logo />
      </header>
      {/* {true && ( */}
      {user && !isToken && (
        <div className="w-full max-w-4xl overflow-hidden rounded-lg">
          <ButtonAccess />
        </div>
      )}
      {/* {user && isToken && <ButtonAccess />} */}
      <main className="flex-[8] w-full max-w-4xl overflow-hidden">
        {/* {false && <Outlet />} */}
        <Outlet />
      </main>
    </div>
  );
};
