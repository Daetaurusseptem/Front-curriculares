import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verCiclo',
  pure:false
})
export class VerCicloPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const a = Math.floor(value / 3);
    if (a == 0){
      return 1
    }
    return a
  }

}
