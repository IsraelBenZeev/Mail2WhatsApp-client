import { FaHome, FaInfoCircle, FaEnvelope, FaTimes } from 'react-icons/fa';
import { type FC, useEffect } from 'react';

type SideMenuProps = {
  open: boolean;
  toggleDrawer: () => void;
};

export const SideMenu: FC<SideMenuProps> = ({ toggleDrawer, open }) => {
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
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 px-4 py-4">
          <p className="text-xs text-gray-400 text-center">Mail2WhatsApp</p>
        </div>
      </div>
    </>
  );
};
