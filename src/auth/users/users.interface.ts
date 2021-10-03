import { Document } from 'mongoose';


export interface IUser  {
  name?: string;
  username?: string;
  email?: string;
  password: string;
  role: string;
  status: boolean;

}