import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutName'
})
export class CutNamePipe implements PipeTransform {

  transform(nombre: string): string {
    const nombreArray = nombre.split(' ')
    return nombreArray[0];
  }

}
