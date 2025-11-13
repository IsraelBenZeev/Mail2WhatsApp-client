import { Outlet, useNavigate } from 'react-router-dom';
import { Logo } from './Logo.tsx';
import { UserDetails } from '../features/user/UserDetails.tsx';
import { useUser } from '../context/UserContext.tsx';
// import { useTokens } from '../hooks/serviceTokens.ts';
import { useEffect } from 'react';
export const AppLayout = () => {
  // const [isToken, setIsToken] = useState<boolean>(false);
  const { user, isToken, initIsToken } = useUser();
  const navigate = useNavigate();
  // const { get_token } = useTokens();
  useEffect(() => {
    if (!user) return;
    console.log('user: ', user);
    initIsToken();
    const fetchTokens = async () => {
      // setIsToken((await get_token(user.id)) || false);
      // console.log("isToken: ", isToken);
    };
    fetchTokens();
  }, [user]);
  useEffect(() => {
    console.log("isToken: ",isToken);
    
    if (!user) navigate('/SignInOAuth');
    if (user && !isToken) navigate('/access-gmail-account');
    if (user && isToken) navigate('/chat');
  }, [isToken, user]);

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
