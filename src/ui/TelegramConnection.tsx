import type { FC } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

export const TelegramConnection: FC = () => {
  const { user } = useUser();
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-2 py-1">
      <div className="max-w-2xl w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-primary/10 rounded-full mb-6">
            <FaTelegramPlane className="text-5xl text-blue-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">התחבר לבוט הטלגרם</h1>
          <p className="text-gray-300 text-lg leading-relaxed">ותתחיל לקבל הודעות ישירות לבוט</p>
        </div>

        <div className="flex justify-center">
          <a
            href={`https://t.me/M2TLLMBOT?start=${user?.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-primary hover:bg-blue-secondary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-primary/50"
          >
            <FaTelegramPlane className="text-2xl" />
            <span className="text-lg">התחבר לבוט הטלגרם</span>
          </a>
        </div>
      </div>
    </div>
  );
};
