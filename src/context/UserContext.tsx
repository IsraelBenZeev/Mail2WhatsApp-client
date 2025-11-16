import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from 'react';
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
// const sendTokenSigninToServer = async (token: string) => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/Auth/signin-callback`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token }),
//     });
//     console.log(response);
//   } catch (error) {
//     console.error('Error sending token to server:', error);
//   }
// };

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData>(null);
  const [isTokenAccessMail, setIsTokenAccessMail] = useState<boolean>(false);
  // const [isTokenSentServer, setIsTokenSentServer] = useState(false);
  const { get_token } = useTokens();
  const initCurrentUser = async () => {
    console.log('enter init');

    // const { data } = await supabase.auth.getSession();

    // if (data.session?.user) {
    //   const u = data.session.user;
    //   setUser({
    //     email: u.email!,
    //     name: u.user_metadata?.full_name,
    //     avatar_url: u.user_metadata?.avatar_url,
    //     id: u.id,
    //   });
    //   return {
    //     email: u.email!,
    //     name: u.user_metadata?.full_name,
    //     avatar_url: u.user_metadata?.avatar_url,
    //     id: u.id,
    //   };
    // } else {
    //   console.log('data on user is null');
    // }
    return null;
  };
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session) {
        console.log('session', session);
        // const token = session.access_token;
        // if (token && !isTokenSentServer) {
        //   await sendTokenSigninToServer(token);
        //   setIsTokenSentServer(true);
        // }
      }
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
        // setIsTokenSentServer(false);
        console.log('🚪 המשתמש נותק');
      }
    });

    // ביטול ההאזנה בעת יציאה מהקומפוננטה
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const initIsToken = async () => {
    if (!user) return;
    setIsTokenAccessMail((await get_token(user.id)) || false);
  };

  return (
    <UserContext.Provider
      value={{ user, initCurrentUser, isToken: isTokenAccessMail, initIsToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
