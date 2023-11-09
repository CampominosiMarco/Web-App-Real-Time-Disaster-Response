import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mioTubo'
})
export class MioTuboPipe implements PipeTransform {
  nvalue: string="";

  transform(value: string, ...args: unknown[]): unknown {
    this.nvalue = value.split('').reverse().join('')
    return this.nvalue;
  }

}
