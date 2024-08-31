import { Bcrypt } from 'oslo/password';

export const verifyPassword = async (password: string, hash: string) => {
  const bcrypt = new Bcrypt();

  return bcrypt.verify(hash, password);
};

export const hashPassword = async (password: string) => {
  const bcrypt = new Bcrypt();

  return bcrypt.hash(password);
};
