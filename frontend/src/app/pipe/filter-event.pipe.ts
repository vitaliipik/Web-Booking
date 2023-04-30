import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterEvent'
})
export class FilterEventPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((series) => {
      return series.name.toLowerCase().includes(searchText.toLowerCase());
    }).slice(0,5);
  }
}
