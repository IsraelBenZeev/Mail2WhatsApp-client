import { type FC } from 'react';
import { useUser } from '../context/UserContext.tsx';
import { UserDetails } from '../features/user/UserDetails.tsx';
import { Logo } from './Logo.tsx';
import { Outlet } from 'react-router-dom';

export const AppLayout: FC = () => {
  const { user, statusToken } = useUser();

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
