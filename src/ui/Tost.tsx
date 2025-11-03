// import type { FC } from 'react';
// import type { StatusType } from '../types/StatusType';
// import { FiLoader } from 'react-icons/fi';

// type ToastProps = {
//   status: StatusType;
//   setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
// };
// export const Toast: FC<ToastProps> = ({ status, setShowToast }) => {
//   return (
//     <div
//       className={`fixed top-4 right-4 left-4 md:left-auto md:w-96 p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
//         status === 'success'
//           ? 'bg-green-600 text-white'
//           : status === 'loading'
//             ? 'bg-blue-600 text-white'
//             : 'bg-red-600 text-white'
//       }`}
//       dir="rtl"
//     >
//       <div className="flex items-center gap-3">
//         {status === 'success' && (
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         )}
//         {status === 'error' && (
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         )}
//         {status === 'loading' && <FiLoader className="w-6 h-6 animate-spin" />}
//         <div className="flex-1">
//           <p className="font-semibold">
//             {status === 'success' && 'הרשמה הושלמה בהצלחה!'}
//             {status === 'error' && 'שגיאה בהרשמה'}
//             {status === 'loading' && 'מתבצעת הרשמה...'}
//           </p>
//           <p className="text-sm mt-1">
//             {status === 'success' && 'החשבון שלך נוצר בהצלחה. ברוך הבא!'}
//             {status === 'error' && 'אירעה שגיאה בעת יצירת החשבון. נסה שנית.'}
//             {status === 'loading' && 'אנא המתן בזמן שאנחנו מטפלים בבקשתך...'}
//           </p>
//         </div>
//         <button
//           onClick={() => setShowToast(false)}
//           className="text-white hover:text-gray-200"
//         >
//           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//             <path
//               fillRule="evenodd"
//               d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };
