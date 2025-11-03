import { useEffect, useState, type FC } from 'react';
import { LuSendHorizontal } from 'react-icons/lu';
import { sendMessage } from '../../utils/serviceAuth';
import type { MessageType } from '../../types/MessageType';
import { FiLoader } from 'react-icons/fi';
import type { StatusType } from '../../types/StatusType';

type InputChatProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
  status: StatusType;
};
export const InputChat: FC<InputChatProps> = ({
  value,
  setValue,
  setMessages,
  setStatus,
  status,
}) => {
  const addMessageUser = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: 'user',
        content: value,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setValue('');
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (value.trim() === '') {
        console.log('הודעה ריקה');
        return;
      }
      addMessageUser();
      sendMessage(value, setStatus, setMessages);
    }
  };
  return (
    <div className="flex flex-col gap-1">
      {status === 'loading' && <div className="self-end loader"></div>}
      {/* {true && <div className="self-end loader"></div>} */}
      <div className="flex gap-2 w-full border border-grayDark p-1 rounded-lg bg-white">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="w-full block border-none outline-none text-right text-xs"
          onKeyDown={handleKeyDown}
        />
        <LuSendHorizontal
          className="rotate-180"
          onClick={() => {
            if (value.trim() === '') {
              console.log('הודעה ריקה');
              return;
            }
            addMessageUser();
            sendMessage(value, setStatus, setMessages);
          }}
        />
      </div>
    </div>
  );
};
