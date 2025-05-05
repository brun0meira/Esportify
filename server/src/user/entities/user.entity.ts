import { Document, SocialAccount } from '@prisma/client';

export class User {
  id: string;
  email: string;
  hashedPassword: string;
  admin: boolean;
  name: string;
  cpf: string;
  rg: string;
  address: string;
  score: number;
  lastLogin: string;
  interests: string[];
  eventsAttended: string[];
  purchases: string[];
  documents?: Document[];
  socialAccounts?: SocialAccount[];
}