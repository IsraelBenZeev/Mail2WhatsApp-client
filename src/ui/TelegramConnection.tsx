import { useEffect, useState, type FC } from 'react';
import { FaTelegramPlane, FaClock, FaBell } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { useTelegram } from '../hooks/serviceTelegtam';

export const TelegramConnection: FC = () => {
  const { user, isChatID, hasTime, setHasTime } = useUser();
  const { delete_chat_id_from_DB, insert_time_to_DB } = useTelegram();

  const [selectedHour, setSelectedHour] = useState<string>('09:00');
  const [isEditingTime, setIsEditingTime] = useState<boolean>(false);
  const [statusSaving, setStatusSaving] = useState<'idle' | 'saving' | 'success' | 'failed'>(
    'idle'
  );
  useEffect(() => {
    setHasTime(selectedHour);
  }, [selectedHour]);
  const handleDisconnect = async () => {
    await delete_chat_id_from_DB(user?.id || '');
  };
  console.log('hasTime: ', hasTime);

  const handleSaveSchedule = async () => {
    setStatusSaving('saving');
    const result = await insert_time_to_DB(user?.id || '', selectedHour);
    if (result) {
      setStatusSaving('success');
      setIsEditingTime(false);
    } else {
      setStatusSaving('failed');
    }
  };

  // יצירת אופציות השעות
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(timeString);
    }
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-2 py-1 overflow-y-auto">
      <div className="max-w-2xl w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-8 shadow-2xl my-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-primary/10 rounded-full mb-6">
            <FaTelegramPlane className="text-5xl text-blue-primary" />
          </div>

          {isChatID ? (
            <>
              <h1 className="text-3xl font-bold text-green-400 mb-4">✓ הינך מחובר לבוט הטלגרם</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                החשבון שלך מחובר בהצלחה לבוט הטלגרם
                <br />
                אתה מקבל הודעות ישירות לטלגרם
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-white mb-4">התחבר לבוט הטלגרם</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                ותתחיל לקבל הודעות ישירות לבוט
              </p>
            </>
          )}
        </div>

        {isChatID && (
          <div className="mb-8 bg-gray-700/30 border border-gray-600 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaBell className="text-2xl text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">הגדר שעת קבלת הודעות</h2>
            </div>

            <p className="text-gray-400 text-center mb-6">
              {hasTime !== '' && !isEditingTime
                ? `השעה הנוכחית היא ${selectedHour}`
                : 'בחר את השעה היומית בה תרצה לקבל את ההודעות מהבוט'}
            </p>

            {(hasTime == null || isEditingTime) && (
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full max-w-xs">
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <FaClock className="text-blue-primary text-xl" />
                  </div>
                  <select
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}
                    className="w-full appearance-none bg-gray-800 border border-gray-600 text-white text-lg font-medium rounded-lg px-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:border-transparent transition-all cursor-pointer hover:border-blue-primary/50"
                    style={{ direction: 'rtl' }}
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time} className="bg-gray-800">
                        {time}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <button
                  onClick={handleSaveSchedule}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-primary to-blue-secondary hover:from-blue-secondary hover:to-blue-primary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-blue-primary/30"
                >
                  {statusSaving === 'saving' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>שומר...</span>
                    </>
                  ) : (
                    <>
                      <FaBell className="text-lg" />
                      <span>שמור הגדרות</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {hasTime && !isEditingTime && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsEditingTime(true)}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <FaClock />
                  <span>ערוך שעה</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          {isChatID ? (
            <button
              onClick={handleDisconnect}
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-600/50"
            >
              <FaTelegramPlane className="text-2xl" />
              <span className="text-lg">נתק את החיבור</span>
            </button>
          ) : (
            <a
              href={`https://t.me/M2TLLMBOT?start=${user?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-primary hover:bg-blue-secondary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-primary/50"
            >
              <FaTelegramPlane className="text-2xl" />
              <span className="text-lg">התחבר לבוט הטלגרם</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
