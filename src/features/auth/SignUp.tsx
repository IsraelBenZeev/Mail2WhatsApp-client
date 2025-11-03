import { useState, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, useSignUpUser } from '../../utils/serviceAuth';
// import { Toast } from '../../ui/Tost';

export const Signup: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'loading' | 'success' | 'error'
  >('idle');
  const { signUpUser } = useSignUpUser();
  // console.log('status: ', status);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(password, email);
    if (!email || !password) {
      console.error('Email and password are required');
      return;
    }
    signUpUser(email.trim(), password.trim());
  };
  return (
    <div className="w-full max-w-md">
      {/* Toast הודעות */}
      {/* {showToast && <Toast status={status} setShowToast={setShowToast} />} */}

      {/* כרטיס ההרשמה */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 ">
        {/* כותרת */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">צור חשבון חדש</h1>
          <p className="text-gray-400 text-sm">
            הירשם עכשיו והתחל להשתמש בשירות
          </p>
        </div>

        {/* טופס הרשמה */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* שדה אימייל */}
          <div>
            <label
              htmlFor="email"
              className="block text-white text-sm font-medium mb-2"
            >
              כתובת אימייל
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
            />
          </div>

          {/* שדה סיסמה */}
          <div>
            <label
              htmlFor="password"
              className="block text-white text-sm font-medium mb-2"
            >
              סיסמה
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
            />
          </div>

          {/* כפתור הרשמה */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            הרשמה
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
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all border border-gray-600 flex items-center justify-center gap-3"
          >
            המשך עם Google
          </button>
        </form>

        {/* הפרדה - משתמש קיים */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm mb-4">
            יש לך כבר חשבון?
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gray-700 text-white font-semibold py-3 rounded-lg hover:bg-gray-600 transition-all border border-gray-600"
          >
            התחבר
          </button>
        </div>
      </div>
    </div>
  );
};
