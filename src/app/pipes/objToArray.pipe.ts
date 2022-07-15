import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ObjToArray',  pure: false
})
export class DesestructurarObjPipe implements PipeTransform {

  transform(obj: any[]): any {
  
    return Object.values(obj! )
  }

}
