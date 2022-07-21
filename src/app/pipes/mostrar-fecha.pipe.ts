import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'mostrarFecha'
})
export class MostrarFechaPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    return new Date().toLocaleDateString()
  }

}
