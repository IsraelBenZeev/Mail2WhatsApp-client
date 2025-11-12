import type { FC } from 'react';
import { useState } from 'react';
import { MdContentCopy } from 'react-icons/md';

type MessageItemProps = {
  label: string;
  time: string;
  isOwn: boolean;
};

export const MessageItem: FC<MessageItemProps> = ({ label, time, isOwn }) => {
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(label);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';

    // אם זה פורמט ISO (2025-11-09T10:09)
    if (timeStr.includes('T')) {
      const date = new Date(timeStr);
      return date.toLocaleTimeString('he-IL', {
        timeZone: 'Asia/Jerusalem',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }

    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
  };

  return (
    <div
      className={`flex mb-3 ${isOwn ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div
        className={`relative max-w-[70%] px-3 py-[0.17rem] rounded-2xl shadow-md ${
          isOwn
            ? 'bg-blue-500 text-white rounded-br-sm'
            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {label}
        </p>
        <div className="flex items-center justify-end gap-2 mt-1">
          <span className="text-[10px] opacity-70">{formatTime(time)}</span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="opacity-70 hover:opacity-100 transition-opacity"
              title={copied ? 'הועתק!' : 'העתק הודעה'}
            >
              <MdContentCopy className="text-xs" />
            </button>
          )}
        </div>
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            הועתק!
          </span>
        )}
      </div>
    </div>
  );
};
