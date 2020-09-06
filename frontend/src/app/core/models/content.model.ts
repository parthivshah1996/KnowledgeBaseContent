import { UserRegistration } from "./userregistration.model";
import { Categories } from './Categories.model';

export class Content {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  categoryId: Categories;
  userId: UserRegistration;
  imageName: string;
}
