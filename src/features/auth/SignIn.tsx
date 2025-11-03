import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

// קומפוננטת כניסה
export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-md">
      {/* כרטיס הכניסה */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        {/* כותרת */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">ברוכים הבאים</h1>
          <p className="text-gray-400 text-sm">היכנסו לחשבון שלכם כדי להמשיך</p>
        </div>

        {/* טופס כניסה */}
        <div className="space-y-5">
          {/* שדה אימייל */}
          <div>
            <label
              htmlFor="login-email"
              className="block text-white text-sm font-medium mb-2"
            >
              כתובת אימייל
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="example@mail.com"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
            />
          </div>

          {/* שדה סיסמה */}
          <div>
            <label
              htmlFor="login-password"
              className="block text-white text-sm font-medium mb-2"
            >
              סיסמה
            </label>
            <input
              type="password"
              id="login-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
            />
          </div>

          {/* כפתור כניסה */}
          <button className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]">
            כניסה
          </button>

          {/* מפריד */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400">או</span>
            </div>
          </div>

          {/* כפתור Google */}
          <button className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all border border-gray-600 flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            היכנס עם Google
          </button>
        </div>

        {/* הפרדה - משתמש חדש */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm mb-4">משתמש חדש?</p>
          <button
            onClick={() => navigate('/signup')}
            className="w-full bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-all border border-gray-600"
          >
            צור חשבון חדש
          </button>
        </div>
      </div>
    </div>
  );
};
