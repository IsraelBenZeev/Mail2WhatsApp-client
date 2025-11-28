// import { useEffect, useState, type FC } from 'react';
// import { useUser } from '../context/UserContext';
// import { Navigate } from 'react-router-dom';
// type ProtectedRouteProps = {
//   children: React.ReactNode;
//   requireToken: boolean;
//   requireUser?: boolean;
// };

// export const ProtectedRoute: FC<ProtectedRouteProps> = ({
//   children,
//   requireToken,
//   requireUser,
// }) => {
//   const { user, isTokenOk, statusToken } = useUser();
//   if (requireUser && !user) {
//     return <Navigate to="/SignInOAuth" replace={true} />;
//   }

//   if (requireToken) {
//     if (statusToken === 'loading') {
//       return <div>Loading...</div>;
//     }
//     if (statusToken === 'success') {
//       if (isTokenOk) {
//         return <Navigate to="/chat" replace />;
//       } else {
//         return <Navigate to="/access_token" replace />;
//       }
//     }
//   }

//   return children;
// };
