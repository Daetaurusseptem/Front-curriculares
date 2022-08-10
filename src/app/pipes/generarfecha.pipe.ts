import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generarfecha'
})
export class GenerarfechaPipe implements PipeTransform {

  transform(value: unknown, mes:Date): unknown {
    return null;
  }

}
