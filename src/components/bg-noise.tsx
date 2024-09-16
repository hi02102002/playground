import { ReactNode } from 'react';

export const BgNoise = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:content-[''] before:opacity-[0.03] before:z-[100] before:pointer-events-none  before:bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/noise_yvdidf.gif')]">
      {children}
    </div>
  );
};
