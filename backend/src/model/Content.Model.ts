import {
  model,
  Schema,
} from 'mongoose';

import { IContent } from '../interface/Content.interface';

const ContentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    categoryId: [{ type: Schema.Types.ObjectId, ref: "category" }],
    image: { type: String, required: false },
    imageName: { type: String, required: false },
    description: { type: String, required: false },
    type: { type: String, required: false },
    userId: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

const ContentModel = model<IContent>("content", ContentSchema);
export default ContentModel;
