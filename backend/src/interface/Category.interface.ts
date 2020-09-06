import { Document } from 'mongoose';

export interface ICategory extends Document {
  id: string;
  name: string;
  image: string;
  description: string;
  userId: string;
}
