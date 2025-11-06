import type { FC } from 'react';
import { useTokens } from '../../hooks/serviceTokens';

export const ButtonAccess: FC = () => {
  const { authorize_user_and_save_tokens } = useTokens();
  return (
    <div>
      <button
        onClick={() => {
          console.log('pressed access');
          authorize_user_and_save_tokens();
        }}
      >
        לחץ על מנת לאפשר גישה לתיבת המייל שלך
      </button>
    </div>
  );
};
