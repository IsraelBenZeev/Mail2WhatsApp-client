import type { FC } from 'react';
import { BoxMessages } from './features/Chat/BoxMessages';

export const App: FC = () => {
  return (
    <div>
      {/* <p className=''>Hello, Mail2WhatsApp!</p> */}
      <BoxMessages />
    </div>
  );
};
