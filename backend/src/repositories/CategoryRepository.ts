import { ICategory } from '../interface/Category.interface';
import { BaseRepository } from './base/BaseRepository';

export class CategoryRepository<T> extends BaseRepository<ICategory> {
    getCategory(item: string): Promise<T[]> {
        return this.model
          .find(JSON.parse(item))
          .populate("userId")
          .exec();
      }
    
      getCategoryById(id: string): Promise<T> {
        return this.model
          .findById(id)
          .populate("userId")
          .exec();
      }
}
