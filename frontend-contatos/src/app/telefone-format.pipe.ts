import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneFormat',
  standalone: true
})
export class TelefoneFormatPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) return '';

    let telefone = value.toString().replace(/\D/g, ''); // remove tudo que não for número

    if (telefone.length === 11) {
      return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

    } else if (telefone.length === 10) {
      return telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    
    } else {
      return value.toString();
    }
  }

}
