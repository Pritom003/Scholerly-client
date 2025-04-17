export interface IUser {
   id:string;
    name: string;
    email: string;
    image:string;
    role:  "admin" | "student"|"tutor";
    status:string
    iat?: number;
    exp?: number;
  }
