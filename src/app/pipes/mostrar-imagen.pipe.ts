import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Pipe({
  name: 'mostrarImagen'
})
export class MostrarImagenPipe implements PipeTransform {

  transform(img?: string, tipo?: 'usuario'|'materia'|'evento'): string {
    if (img){
      return `${environment.baseUrl}/uploads/imagen/${tipo}/${img}`;
    }else 
    if(!img){
      return `${environment.baseUrl}/uploads/imagen/usuario/no_image.png`;
    }
    return ''
  }

}
