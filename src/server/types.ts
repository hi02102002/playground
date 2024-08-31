import type { Session, User } from "lucia";

import { DbType } from "@/db";

export type ContextVariables = {
  db: DbType;
  user: User | null;
  session: Session | null;
};

export type GoogleUserRes = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  hd: string;
};
