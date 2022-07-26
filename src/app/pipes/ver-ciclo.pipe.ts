import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verCiclo'
})
export class VerCicloPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Math.floor(value / 3);
  }

}
