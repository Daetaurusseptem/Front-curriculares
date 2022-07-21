import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'mostrarHoras'
})
export class MostrarHorasPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    return moment(value).locale('es-mx').format('LLLL');
  }

}
