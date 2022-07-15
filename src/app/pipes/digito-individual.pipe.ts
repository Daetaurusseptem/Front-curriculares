import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitoIndividual'
})
export class DigitoIndividualPipe implements PipeTransform {

  transform(numero: number, ...args: unknown[]): unknown {
    if(numero>0 && numero<10){
      return '0'+numero
    }
    return numero;
  }

}
