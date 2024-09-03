import { ReactNode, createContext, useContext } from 'react';

import { TUser } from '@/db';

export type UserCtx = {
  user: Omit<TUser, 'password'> | null;
};

export const UserContext = createContext<UserCtx>({
  user: null,
});

export const UserProvider = ({
  children,
  user,
}: {
  user: Omit<TUser, 'password'> | null;
  children: ReactNode;
}) => {
  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error('useUser must using inside UserProvider.');
  }

  return ctx.user;
};
