import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchCategoryFilter'
})
export class CategorySearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.name.toLocaleLowerCase().includes(args)) || (val.description.toLocaleLowerCase().includes(args));
      return rVal;
    })

  }

}