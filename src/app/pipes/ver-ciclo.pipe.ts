import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verCiclo',
  pure:false
})
export class VerCicloPipe implements PipeTransform {

  transform(value: number|any, ...args: unknown[]): unknown {

    switch (value) {
      case 1:
      case 2:
      case 3:
      case 4:
        return 1
      case 4:
      case 5:
      case 6:
      case 7:
        return 2
      case 8:
      case 9:
      case 10:
      case 11:
        return 3
      case '1':
      case '2':
      case '3':
      case '4':
        return 1
      case '4':
      case '5':
      case '6':
      case '7':
        return 2
      case '8':
      case '9':
      case '10':
      case '11':
        return 3

      default:
        return 'No valido'
    }


  }

}
