import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiLogIn } from 'react-icons/fi';

export const ConnectRequired: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* כרטיס הודעת חיבור נדרש */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
          {/* אייקון מנעול */}
          <div className="mb-6 flex justify-center">
            <div className="bg-blue-primary/20 p-6 rounded-full">
              <FiLock className="w-12 h-12 text-blue-primary" />
            </div>
          </div>

          {/* כותרת */}
          <h1 className="text-3xl font-bold text-white mb-3">נדרש חיבור לחשבון</h1>

          {/* תיאור */}
          <p className="text-gray-400 mb-8 text-lg">כדי להמשיך, עליך להתחבר או להירשם לשירות</p>

          {/* כפתור התחברות */}
          <button
            onClick={() => navigate('/SignInOAuth')}
            className="w-full bg-blue-primary hover:bg-blue-secondary text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105"
          >
            <FiLogIn className="w-5 h-5" />
            <span>התחבר / הירשם</span>
          </button>

          {/* טקסט נוסף */}
          <p className="text-gray-500 text-sm mt-6">חווית שימוש מאובטחת ופשוטה</p>
        </div>
      </div>
    </div>
  );
};
