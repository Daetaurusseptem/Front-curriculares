import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/models/usuario.model';

const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  usuario = Usuario;

  constructor() { }

  // tslint:disable-next-line: typedef
  async actualizarFoto(
    archivo: File,
    tipo: 'usuario'| 'materia' | 'evento',
    id: string
    )
    {

      try {
        const url = `${base_url}/uploads/imagen/${ tipo }/${ id }`;
        const formData = new FormData();
        const token = localStorage.getItem('token') || '';
        formData.append('imagen', archivo);

        const resp = await fetch(url, {
          method: 'POST',
          headers: {
            'x-token': token
          },
          body: formData
        }
        );

        const data = await resp.json();
        if (data.ok){
           return data.nombreArchivo;
         }
         else{
            return data.msg;
         }

    }catch (error){
      return error;
    }
  }

}
