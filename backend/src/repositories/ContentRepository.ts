import { IContent } from '../interface/Content.interface';
import { BaseRepository } from './base/BaseRepository';

export class ContentRepository<T> extends BaseRepository<IContent> {
  getContent(item: string): Promise<T[]> {
    return this.model
      .find(JSON.parse(item))
      .populate("categoryId")
      .populate("userId")
      .exec();
  }

  getContentById(id: string): Promise<T> {
    return this.model
      .findById(id)
      .populate("categoryId")
      .populate("userId")
      .exec();
  }
}
