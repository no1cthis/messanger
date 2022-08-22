import { Timestamp } from "firebase/firestore";

export type IInput = {
  name: "password" | "email"; // | 'name'
  type: string;
  placeholder: string;
  errorText: string;
  required?: boolean;
  pattern: string;
  patternJS: RegExp;
};

export type IAuth = {
  // name:   string,
  email: string;
  password: string;
};

export interface IUser {
  avatar: string;
  avatarPath: string;
  email: string;
  isOnline: boolean;
  name: string;
  uid: string;
}

export interface IMessage {
  from: string;
  to: string;
  sendAt: Timestamp;
  text: string;
  id: string;
  readed: boolean;
}
