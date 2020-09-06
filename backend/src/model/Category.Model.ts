import {
  model,
  Schema,
} from 'mongoose';

import { ICategory } from '../interface/Category.interface';

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: false },
    userId: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const CategoryModel = model<ICategory>("category", CategorySchema);
export default CategoryModel;
