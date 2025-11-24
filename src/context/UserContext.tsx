import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';
import { supabase } from '../utils/supabase-client';
import { type Session } from '@supabase/supabase-js';
type UserData = {
  email: string;
  name?: string;
  avatar_url?: string;
  id: string;
} | null;

type UserContextType = {
  user: UserData;
};

const UserContext = createContext<UserContextType>({
  user: null,
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData>(null);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('session: ', session);
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session?.user) setUser(null);
    else {
      setUser({
        email: session.user.email || '',
        id: session.user.id,
        name: session.user.user_metadata?.full_name,
        avatar_url: session.user.user_metadata?.avatar_url,
      });
      console.log('user from context: ', user);
    }
  }, [session]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
