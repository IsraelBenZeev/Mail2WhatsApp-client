import React, { createContext, useContext, useEffect, useState, type FC } from 'react';
import { supabase } from '../utils/supabase-client';
import { useTokens } from '../hooks/serviceTokens';

type UserData = {
  email: string;
  name?: string;
  avatar_url?: string;
  id: string;
} | null;

type UserContextType = {
  user: UserData;
  initCurrentUser: () => Promise<UserData>;
  isToken: boolean;
  initIsToken: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  initCurrentUser: async () => null,
  isToken: false,
  initIsToken: async () => {},
});

export const UserProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData>(null);
  const [isToken, setIsToken] = useState<boolean>(false);
  const { get_token } = useTokens();
  const initCurrentUser = async () => {
    console.log('enter init');

    const { data } = await supabase.auth.getSession();

    if (data.session?.user) {
      const u = data.session.user;
      setUser({
        email: u.email!,
        name: u.user_metadata?.full_name,
        avatar_url: u.user_metadata?.avatar_url,
        id: u.id,
      });
      return {
        email: u.email!,
        name: u.user_metadata?.full_name,
        avatar_url: u.user_metadata?.avatar_url,
        id: u.id,
      };
    } else {
      console.log('data on user is null');
    }
    return null;
  };
  useEffect(() => {
    // האזנה לשינויי התחברות
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const u = session.user;
          setUser({
            email: u.email!,
            name: u.user_metadata?.full_name,
            avatar_url: u.user_metadata?.avatar_url,
            id: u.id,
          });
          console.log('✅ משתמש התחבר:', u.email);
        } else {
          setUser(null);
          console.log('🚪 המשתמש נותק');
        }
      }
    );

    // ביטול ההאזנה בעת יציאה מהקומפוננטה
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const initIsToken = async () => {
    if (!user) return;
    setIsToken((await get_token(user.id)) || false);
  };

  return (
    <UserContext.Provider
      value={{ user, initCurrentUser, isToken, initIsToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
