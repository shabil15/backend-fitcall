import { ISession } from "./session";
import { IRating } from "./rating";

export interface ITrainer {
  _id?: string;
  name: string;
  mobile: string;
  email: string;
  password: string;
  description:string;
  language: string;
  specialisation: string;
  certificate: string;
  profile_img?: string;
  status?: string;
  isBlocked?: boolean;
  createdAt?: Date;
  experience?:string;
  sessions?:ISession[];
  clientCount?:number;
  ratings?:IRating[];

}
