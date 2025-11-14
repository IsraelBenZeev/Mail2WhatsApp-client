import { type FC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '../../hooks/serviceAuth';

export const SignInOAuth: FC = () => {
  // const { user, initCurrentUser } = useUser();
  const { signInWithProvider } = useAuth();
  return (
    <div className="w-full max-w-md">
      {/* כרטיס ההרשמה */}
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 ">
        {/* כותרת */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">בחר את הספק כדי להתחבר לחשבון שלך.</h1>
          <p className="text-gray-400 text-sm">הירשם עכשיו והתחל להשתמש בשירות</p>
        </div>

        {/* כפתורי כניסה */}
        <div className="space-y-4">
          {/* כפתור Google */}
          <button
            onClick={() => signInWithProvider('google')}
            type="button"
            className="w-full bg-white text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-all border border-gray-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          >
            <FcGoogle className="w-5 h-5" />
            המשך עם Google
          </button>
          <button
            onClick={() => {
              console.log('import.meta.env.VITE_HOST_URL: ', import.meta.env.VITE_HOST_URL);
            }}
          >
            Test Env
          </button>

          {/* כפתור Apple */}
          {/* <button
            type="button"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-all border border-gray-700 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          >
            <FaApple className="w-5 h-5" />
            המשך עם Apple
          </button> */}

          {/* כפתור GitHub */}
          <button
            onClick={() => signInWithProvider('github')}
            type="button"
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition-all border border-gray-600 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          >
            <FaGithub className="w-5 h-5" />
            המשך עם GitHub
          </button>

          {/* כפתור Facebook */}
          {/* <button
            type="button"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all border border-blue-500 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          >
            <FaFacebook className="w-5 h-5" />
            המשך עם Facebook
          </button> */}
        </div>
      </div>
    </div>
  );
};
