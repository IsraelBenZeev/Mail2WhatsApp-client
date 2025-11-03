import type { FC } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { AppLayout } from './ui/AppLayout';
import { Signup } from './features/auth/SignUp';
import { Login } from './features/auth/SignIn';

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
    </>
  );
};
