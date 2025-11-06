import { useState, type FC } from 'react';

export const ImageUser: FC<{ url: string; fallback: string }> = ({
  url,
  fallback,
}: {
  url: string;
  fallback: string;
}) => {
  const [imgSrc, setImgSrc] = useState(url);
  return (
    <img
      src={imgSrc}
      alt="Profile"
      onError={() => setImgSrc(fallback)} // אם לא נטען, להחליף ל fallback
      style={{ width: 100, height: 100, borderRadius: '50%' }}
    />
  );
};