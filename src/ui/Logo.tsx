import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logo: FC = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/')}
      className="flex items-center justify-center"
    >
      <div className="text-3xl font-bold text-white tracking-tight">
        <span className="text-gray-300">Mail</span>
        <span className="text-white">2</span>
        <span className="text-green-500">WhatsApp</span>
      </div>
    </div>
  );
};
