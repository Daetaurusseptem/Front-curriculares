import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verMes',
  pure:false
})
export class VerMesPipe implements PipeTransform {

  transform(value: Number|any, ...args: unknown[]): unknown {
    switch (value) {
      case '0':
        return 'Enero';
      case '1':
        return 'Febrero'
      case '2':
        return 'Marzo'
      case '3':
        return 'Abril'
      case '4':
        return 'Mayo'
      case '5':
        return 'Junio'
      case '6':
        return 'Julio'
      case '7':
        return 'Agosto'
      case '8':
        return 'Septiembre'
      case '9':
        return 'Octubre'
      case '10':
        return 'Noviembre'
      case '11':
        return 'Diciembre'
      case 0:
        return 'Enero';
      case 1:
        return 'Febrero'
      case 2:
        return 'Marzo'
      case 3:
        return 'Abril'
      case 4:
        return 'Mayo'
      case 5:
        return 'Junio'
      case 6:
        return 'Julio'
      case 7:
        return 'Agosto'
      case 8:
        return 'Septiembre'
      case 9:
        return 'Octubre'
      case 10:
        return 'Noviembre'
      case 11:
        return 'Diciembre'
      default:
        return 'Ok'
    }

  }

}
