import { FaHome, FaInfoCircle, FaEnvelope, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { type FC, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/serviceAuth';
import { useNavigate } from 'react-router-dom';
import { TelegramButton } from '../../ui/TelegramButton';

type SideMenuProps = {
  open: boolean;
  toggleDrawer: () => void;
};

export const SideMenu: FC<SideMenuProps> = ({ toggleDrawer, open }) => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        toggleDrawer();
      }
    };

    // הוסף את המאזין
    document.addEventListener('keydown', handleEscKey);

    // נקה את המאזין כשהקומפוננטה נהרסת
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [open, toggleDrawer]);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLogoutPopup(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      setShowLogoutPopup(false);
      await signOut();
      // המתן קצת כדי לוודא שהכל נוקה לפני ניווט
      await new Promise((resolve) => setTimeout(resolve, 100));
      navigate(`/SignInOAuth`, { replace: true });
    } catch (error) {
      console.error('שגיאה בהתנתקות:', error);
      // גם במקרה של שגיאה, ננסה לנווט לדף ההתחברות
      navigate(`/SignInOAuth`, { replace: true });
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutPopup(false);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={(e) => {
            e.stopPropagation();
            toggleDrawer();
          }}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black border-l border-gray-700 shadow-2xl z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleDrawer();
            }}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="text-xl text-gray-300" />
          </button>
          <h2 className="text-lg font-semibold text-white">תפריט</h2>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-3 p-4">
          {/* Home */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleDrawer();
            }}
            className="flex items-center gap-3 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-blue-primary hover:border-blue-primary transition-all cursor-pointer group"
          >
            <FaHome className="text-lg text-blue-primary group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-right flex-1 text-gray-200 group-hover:text-white">
              בית
            </span>
          </div>
          <TelegramButton toggleDrawer={toggleDrawer} />

          {/* About */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleDrawer();
            }}
            className="flex items-center gap-3 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-blue-primary hover:border-blue-primary transition-all cursor-pointer group"
          >
            <FaInfoCircle className="text-lg text-blue-primary group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-right flex-1 text-gray-200 group-hover:text-white">
              אודות
            </span>
          </div>

          {/* Contact */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleDrawer();
            }}
            className="flex items-center gap-3 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 hover:bg-blue-primary hover:border-blue-primary transition-all cursor-pointer group"
          >
            <FaEnvelope className="text-lg text-blue-primary group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-right flex-1 text-gray-200 group-hover:text-white">
              צור קשר
            </span>
          </div>

          {/* Logout */}
          <div
            onClick={handleLogoutClick}
            className="flex items-center gap-3 px-4 py-3 border-2 border-red-500/50 rounded-lg bg-red-900/20 hover:bg-red-600 hover:border-red-500 transition-all cursor-pointer group mt-4"
          >
            <FaSignOutAlt className="text-lg text-red-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-right flex-1 text-red-300 group-hover:text-white">
              התנתק
            </span>
          </div>
        </div>

        {/* Logout Popup */}
        {showLogoutPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4">
              <h3 className="text-xl font-semibold text-white text-center mb-4">התנתקות</h3>
              <p className="text-gray-300 text-center mb-6">האם אתה בטוח שברצונך להתנתק?</p>
              <div className="flex gap-3">
                <button
                  onClick={handleLogoutCancel}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  ביטול
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  התנתק
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 px-4 py-4">
          <p className="text-xs text-gray-400 text-center">Mail2WhatsApp</p>
        </div>
      </div>
    </>
  );
};
