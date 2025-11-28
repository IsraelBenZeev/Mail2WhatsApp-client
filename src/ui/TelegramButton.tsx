import type { FC } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export const TelegramButton: FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {
  const navigate = useNavigate()

  return (
    <div>
      {/* telegram */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          navigate('/connection-telegram')
          toggleDrawer();
        }}
        className="flex items-center gap-3 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-blue-primary hover:border-blue-primary transition-all cursor-pointer group relative"
      >
        <div className="absolute top-0 right-0 group/info">
          <IoIosInformationCircle className="w-3 h-3 absolute right-1 top-1 text-lg text-gray-400 group-hover:text-white transition-colors cursor-help" />
          <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all duration-200 z-50">
            <p className="text-xs text-gray-300 text-right leading-relaxed">
              התחבר לבוט הטלגרם שלנו וקבל את כל ההודעות מהמייל שלך ישירות לטלגרם בזמן אמת
            </p>
          </div>
        </div>
        <FaTelegramPlane className="text-lg text-blue-primary group-hover:text-white transition-colors" />
        <span className="text-sm font-medium text-right flex-1 text-gray-200 group-hover:text-white">
          התחבר לבוט הטלגרם
        </span>
      </div>
    </div>
  );
};
