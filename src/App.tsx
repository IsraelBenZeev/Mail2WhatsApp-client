import {  useEffect, type FC } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { AppLayout } from './ui/AppLayout';
import { SignInOAuth } from './features/auth/SignInOAuth';
import { Flip, ToastContainer } from 'react-toastify';
import { BoxMessages } from './features/Chat/Chat';
import { useUser } from './context/UserContext';
import { AccessGmailAccount } from './features/user/AccessGmailAccount';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/SignInOAuth" replace /> },
      { path: '/SignInOAuth', element: <SignInOAuth /> },
      { path: '/chat', element: <BoxMessages /> },
      { path: '/access-gmail-account', element: <AccessGmailAccount /> },
    ],
  },
]);
export const App: FC = () => {
  const { user, initCurrentUser, initIsToken } = useUser();
  useEffect(() => {
    initCurrentUser();
  }, []);
  useEffect(() => {
    if (!user) return;
    console.log('user: ', user);

    initIsToken();
  }, [user]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        // toastClassName={'w-60 font-sans text-base'}
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
        // className="w-60 font-sans text-base"
      />
    </>
  );
};
