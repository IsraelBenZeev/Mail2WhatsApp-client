import { Outlet } from 'react-router-dom';
import { Logo } from './Logo.tsx';
import { UserDetails } from '../features/user/UserDetails.tsx';
import { ButtonAccess } from '../features/user/ButtonAccess.tsx';
import { useUser } from '../context/UserContext.tsx';
export const AppLayout = () => {
  const { user } = useUser();
  console.log('user', user);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <header className="flex justify-between items-center mb-4 w-full max-w-4xl">
        {user && <UserDetails />}
        <Logo />
      </header>
      {user && <ButtonAccess />}
      <Outlet />
    </div>
  );
};
