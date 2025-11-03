import type { FC } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { AppLayout } from './ui/AppLayout';
import { Signup } from './features/auth/SignUp';
import { Login } from './features/auth/SignIn';
import { Flip, ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);
export const App: FC = () => {
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
