import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcateroies'
})
export class SubcateroiesPipe implements PipeTransform {

  transform(value: any, catergory: string): any {
  //   const arr = [];
  //   for(const item of value) {
  //       console.log("hello")
  //     if(item.mid === mid && item.sid ===sid) {
  //       arr.push(item)
  //     }

  //   }
  //   return arr;

  //return value;
  if(!value) return;
  return value.filter(value => value.catergoryName == catergory);
  }

}
