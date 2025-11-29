import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
type ButtonSideBarProps = {
  toggleDrawer: () => void;
  children: ReactNode;
  navigateTo: string;
};
export const ButtonSideBar: FC<ButtonSideBarProps> = ({
  children,
  toggleDrawer,
  navigateTo,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* chat */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate(navigateTo || '', { replace: true });
          toggleDrawer();
        }}
        className="flex items-center gap-3 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-blue-primary hover:border-blue-primary transition-all cursor-pointer group relative"
      >
        {children}
      </div>
    </div>
  );
};
