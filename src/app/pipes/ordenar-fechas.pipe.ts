import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarFechas'
})
export class OrdenarFechasPipe implements PipeTransform {

  transform(value: [{fecha:Date,asistio:Boolean}], ...args: unknown[]): [{fecha:Date,asistio:Boolean}] {
    const sortedDesc = value.sort(
      (objA, objB) => Number(objB.fecha) - Number(objA.fecha),
    );

    console.log(sortedDesc);
    return sortedDesc;
  }

}
