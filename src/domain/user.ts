import { IDiet } from "./diet";
import { ISubscription } from "./subscription";

export interface IUser {
  _id?: string;
  name: string;
  mobile?: string;
  email: string;
  password: string;
  profile_img?: string;
  isBlocked?: boolean;
  isSubscribed?: boolean;
  subscriptions?: ISubscription[];
  trainerId?: string; 
  age?:string; 
  height?: string; 
  weight?: string;
  goal?: string;
  diet?:IDiet;
  testResult?:string;
}
