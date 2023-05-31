import { Avatar } from './avatar'
export interface Message {
  id: string;
  userName: string;
  message: string;
  createdAt: string;
  userId: string;
  imageType: Avatar;
};