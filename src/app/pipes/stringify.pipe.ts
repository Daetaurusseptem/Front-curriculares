import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringify'
})
export class StringifyPipe implements PipeTransform {

  transform(value: Object, ...args: unknown[]): unknown {
    return JSON.stringify(value);
  }

}
