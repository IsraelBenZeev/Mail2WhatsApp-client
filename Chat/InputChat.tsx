import type { FC } from 'react';
import { LuSendHorizontal } from 'react-icons/lu';

type InputChatProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<
    React.SetStateAction<{ label: string; time: string; isOwn: boolean }[]>
  >;
};
export const InputChat: FC<InputChatProps> = ({
  value,
  setValue,
  setMessages,
}) => {
  const addMessage = () => {
    if (value.trim() === '') return; // לא מוסיף הודעות ריקות
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        label: value,
        time: new Date().toLocaleTimeString(),
        isOwn: true,
      },
    ]);
    setValue('');
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addMessage();
    }
  };
  return (
    <div className="flex gap-2 w-full border border-grayDark p-1 rounded-lg bg-white">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="w-full block border-none outline-none text-right text-xs"
        onKeyDown={handleKeyDown}
      />
      <LuSendHorizontal className="rotate-180" onClick={() => addMessage()} />
    </div>
  );
};
