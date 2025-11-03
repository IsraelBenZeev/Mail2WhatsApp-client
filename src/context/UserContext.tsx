import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../utils/supabase-client';

type UserData = {
  email: string;
  name?: string;
  avatar_url?: string;
} | null;

type UserContextType = {
  user: UserData;
  initCurrentUser: () => Promise<UserData>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  initCurrentUser: async () => null,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData>(null);

  const initCurrentUser = async () => {
    const { data } = await supabase.auth.getSession();
    console.log('data: ', data);

    if (data.session?.user) {
      const u = data.session.user;
      console.log('data: ', data);
      console.log('u: ', u);

      setUser({
        email: u.email!,
        name: u.user_metadata?.full_name,
        avatar_url: u.user_metadata?.avatar_url,
      });
      return {
        email: u.email!,
        name: u.user_metadata?.full_name,
        avatar_url: u.user_metadata?.avatar_url,
      };
    } else {
      console.log('data is null');
    }
    return null;
  };

  return (
    <UserContext.Provider value={{ user, initCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
