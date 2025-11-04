// export const useSignUpUser = () => {
//   const toastId = useRef<string | number | null>(null);

//   const signUpUser = async (email: string, password: string) => {
//     try {
//       toastId.current = toast.loading('מתחבר לשרת, אנא המתן...', {
//         position: 'top-center',
//         closeOnClick: true,
//         rtl: true,
//       });
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//       });
//       console.log('data: ', data);
//       console.log('error: ', error);

//       if (error || !data.user) {
//         toast.update(toastId.current!, {
//           render: error?.message || 'שגיאה בהרשמה. נסה שוב מאוחר יותר.',
//           type: 'error',
//           isLoading: false,
//           autoClose: 2000,
//         });
//         console.log('enter to error');
//         console.error('Error signing up:', error?.message);
//         return null;
//       }

//       const user: User = data.user;
//       const createdAt = new Date(user.created_at).getTime();
//       const confirmationSentAt = user.confirmation_sent_at
//         ? new Date(user.confirmation_sent_at).getTime()
//         : createdAt; // fallback
//       const diffSeconds = (confirmationSentAt - createdAt) / 1000;
//       if (user) {
//         if (diffSeconds <= 5 && user.identities && user.identities.length > 0) {
//           // משתמש חדש
//           toast.update(toastId.current!, {
//             render: 'ברוכים הבאים! נשלח מייל לאימות, בדוק את תיבת הדואר שלך.',
//             type: 'success',
//             isLoading: false,
//             autoClose: 4000,
//           });
//         } else if (Object.keys(user.user_metadata).length > 0) {
//           // משתמש קיים שלא אושר
//           toast.update(toastId.current!, {
//             render: 'משתמש קיים שלא אושר, נשלח מייל אימות נוסף.',
//             type: 'info',
//             isLoading: false,
//             autoClose: 4000,
//           });
//         } else {
//           // משתמש קיים ומאומת
//           toast.update(toastId.current!, {
//             render: 'מייל כבר קיים ומאומת. נסה להתחבר לחשבונך.',
//             type: 'info',
//             isLoading: false,
//             autoClose: 4000,
//           });
//         }
//       }
//     } catch (err: any) {
//       console.error('Unexpected error:', err);
//       toast.update(toastId.current!, {
//         render: err.message! || 'שגיאה לא צפויה. נסה שוב מאוחר יותר.',
//         type: 'error',
//         isLoading: false,
//         autoClose: 2000,
//       });
//       return null;
//     }
//   };
//   return { signUpUser };
// };