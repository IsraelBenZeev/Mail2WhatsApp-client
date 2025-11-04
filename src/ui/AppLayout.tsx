import { Outlet } from 'react-router-dom';
import { Logo } from './Logo.tsx';
export const AppLayout = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <header className="mb-4">
        <Logo />
      </header>
      <Outlet />
    </div>
  );
};
