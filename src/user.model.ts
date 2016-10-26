import {IUser} from "./interfaces/user.interface";
export class User implements IUser {
  constructor(public phone:string, public pin:string){}
}
