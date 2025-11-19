import { useRef, type Dispatch, type FC, type KeyboardEvent, type SetStateAction } from 'react';
import { LuSendHorizontal } from 'react-icons/lu';
import { sendMessage } from '../../utils/service';
import type { MessageType } from '../../types/MessageType';
import type { StatusType } from '../../types/StatusType';
import { useUser } from '../../context/UserContext';

type InputChatProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  setStatus: Dispatch<SetStateAction<StatusType>>;
  status: StatusType;
  isLoadingMessages?: boolean;
};
export const InputChat: FC<InputChatProps> = ({
  value,
  setValue,
  setMessages,
  setStatus,
  status,
  isLoadingMessages,
}) => {
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300); // זמן המתנה עד שהמקלדת באמת מופיעה
  }

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
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(status === 'loading') return;
    if (event.key === 'Enter') {
      event.preventDefault();
      if (value.trim() === '') {
        console.log('הודעה ריקה');
        return;
      }
      addMessageUser();
      sendMessage(value, setStatus, setMessages, user?.id);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {status === 'loading' && <div className="self-start loader-chat mb-2"></div>}
      <div className="flex gap-2 w-full border border-gray-300 p-3 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
        {!isLoadingMessages && (
          <>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="הקלד הודעה..."
              className="w-full block border-none outline-none text-right text-sm placeholder:text-gray-400"
              onKeyDown={handleKeyDown}
              autoFocus
              onFocus={handleFocus}
            />
            <button className="group" disabled={status === 'loading'}>
              <LuSendHorizontal
                // className="rotate-180 text-blue-500 hover:text-blue-700 transition-colors duration-150 ease-in-out cursor-pointer text-xl flex-shrink-0"
                className="rotate-180 text-xl flex-shrink-0 text-blue-500 transition-colors duration-150 group-hover:text-blue-700 group-disabled:text-blue-400 group-disabled:hover:text-blue-400"
                onClick={() => {
                  if (value.trim() === '') {
                    return;
                  }
                  addMessageUser();
                  sendMessage(value, setStatus, setMessages, user?.id);
                }}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
