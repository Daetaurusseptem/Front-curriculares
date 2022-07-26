import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from 'src/models/usuario.model';
import { UsuarioBusqueda } from '../interfaces/UsuarioBusqueda.interface';


const baseUrl=environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {
  constructor(private http: HttpClient) { }

  private transformToUsers(resultados: any[] ): Usuario[] {

    return resultados.map(
      usuario => new Usuario(
        usuario._id,
        usuario.nombre,
        usuario.apellido1,
        usuario.email,
        usuario.role,
        usuario.cuatrimestre,
        usuario.carrera,
        usuario.matricula,
        usuario.materia,
        null,
        usuario.apellido2,
        '',
        usuario.img,
        null

        ));

  }

  buscar(

    tipo: 'alumnos' | 'materias' | 'eventos'|'maestros',
    termino: string

    ): any {

      if (termino === ''){
        return;
      }

      return this.http.get<UsuarioBusqueda[]>(`${baseUrl}/todo/coleccion/${tipo}/${termino}`, this.headers)
        .pipe(
         map((resp:any)=>{
           switch (tipo) {
             case 'alumnos':
                return this.transformToUsers( resp.resultados );
             case 'maestros':
                return this.transformToUsers( resp.resultados );
              case 'eventos':
                return resp.resultados
              case 'materias':
                return resp.resultados


             default:
               return[]
           }
         })
        );

    }

    buscarGeneral(termino:string){
      return this.http.get(`${baseUrl}/todo/${termino}`, this.headers)
    }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(): object{
    return {
      headers: {
      'x-token': this.token
      }
  };
  }
}
