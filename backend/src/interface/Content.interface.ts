import { Document } from 'mongoose';

export interface IContent extends Document {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  userId: string;
  imageName: string;
}
