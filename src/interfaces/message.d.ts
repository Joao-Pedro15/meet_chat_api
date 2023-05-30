import { Avatar } from './avatar'
export type Message = {
  id: string;
  userName: string;
  message: string;
  createdAt: string;
  userId: string;
  imageType: Avatar;
};