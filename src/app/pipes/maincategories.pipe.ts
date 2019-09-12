import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maincategories'
})
export class MaincategoriesPipe implements PipeTransform {

  transform(value: any, nam: string,nam2: string): any {
    // const arr = [];
    // console.log("mainpipe")
    // console.log(typeof(value))
    // for(let item of value) {
    //     console.log("fdg")
    //   if(item.catergoryName === mid ) {
    //     arr.push(item)
    //   }

    // }
    // return arr;
    if(nam == null && nam2 == null){
      return value;
    }
  return value.filter(value => value.name == nam || value.name == nam2);
   // return value.substr(0,80) + '.......';
  }

}
