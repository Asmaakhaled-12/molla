import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../models/icategory';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(categories:ICategory[],searchInput:string): ICategory[] {
    if(!searchInput)
    {
      return categories;
    }
    return categories.filter(c=>c.title.toLocaleLowerCase().includes(searchInput.toLowerCase()))
  }

}
