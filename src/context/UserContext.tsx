import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type ReactNode,
} from 'react';
import { supabase } from '../utils/supabase-client';
import { type Session } from '@supabase/supabase-js';
import { useTokens } from '../hooks/serviceTokens';
import { use_chat_ids } from '../hooks/serviceChatID';
type UserData = {
  email: string;
  name?: string;
  avatar_url?: string;
  id: string;
} | null;

type UserContextType = {
  user: UserData;
  statusToken: 'idle' | 'loading' | 'success' | 'failed';
  setStatusToken: Dispatch<React.SetStateAction<'idle' | 'loading' | 'success' | 'failed'>>;
  isTokenOk: boolean;
  setIsTokenOk: Dispatch<React.SetStateAction<boolean>>;
  isChatID: boolean;
  statusCheckChatID: 'idle' | 'loading' | 'success' | 'failed';
  setStatusCheckChatID: Dispatch<React.SetStateAction<'idle' | 'loading' | 'success' | 'failed'>>;
  setIsChatID: Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  statusToken: 'idle',
  setStatusToken: () => {},
  isTokenOk: false,
  setIsTokenOk: () => {},
  isChatID: false,
  statusCheckChatID: 'idle',
  setStatusCheckChatID: () => {},
  setIsChatID: () => {},
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isChatID, setIsChatID] = useState<boolean>(false);
  const [statusCheckChatID, setStatusCheckChatID] = useState<
    'idle' | 'loading' | 'success' | 'failed'
  >('idle');
  const [statusToken, setStatusToken] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');
  const [isTokenOk, setIsTokenOk] = useState<boolean>(false);
  const { get_token } = useTokens();
  const { get_chat_id } = use_chat_ids();
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
  useEffect(() => {
    const tokensAccess = async () => {
      if (!user) return;
      const hasToken = await get_token(user.id, setStatusToken);
      setIsTokenOk(hasToken || false);
    };
    const chatIDAccess = async () => {
      if (!user) return;
      const hasChatID = await get_chat_id(user.id, setStatusCheckChatID);
      setIsChatID(hasChatID || false);
    };
    tokensAccess();
    chatIDAccess();
    console.log('isChatID: ', isChatID);
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        user,
        isTokenOk,
        statusToken,
        setStatusToken,
        setIsTokenOk,
        isChatID,
        statusCheckChatID,
        setStatusCheckChatID,
        setIsChatID,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
