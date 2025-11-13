import { useState, type FC } from 'react';
import { useUser } from '../../context/UserContext';
import { SideMenu } from './SideBar';

export const UserDetails: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    console.log('enter toggleDrawer');

    setOpen((prev) => !prev);
  };

  const { user } = useUser();

  return (
    <div onClick={toggleDrawer} color="inherit">
      <div className="flex flex-col items-center gap-1">
        <img
          src={user?.avatar_url}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
          }}
        />
        {/* <h1>{user?.email}</h1> */}
        <p className="text-gray-300 text-[0.65rem]">{user?.name}</p>
      </div>
      <SideMenu open={open} toggleDrawer={toggleDrawer} />
    </div>
  );
};
