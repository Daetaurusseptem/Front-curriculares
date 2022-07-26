import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { maestrosResponse } from '../interfaces/maestroResponse.interface';
import { maestro } from '../interfaces/maestro.interface';
import { usuarioCreadoResponse } from '../interfaces/usuarioCreadoResponse.interface';
import { materias } from '../interfaces/materiasSimple.interface';

const urlBase = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(private http:HttpClient) { }



   crearMaestro(formData:maestro){

    let nuevoUsuario={
      nombre:formData.nombre,
      apellido1:formData.apellido1,
      apellido2:formData.apellido2,
      email:formData.email,
      password:formData.password,
      role:'maestro'
    }
    return this.http.post<usuarioCreadoResponse>(`${urlBase}/usuarios/maestro`, nuevoUsuario, this.headers)



  }


  updateAlumno(maestro:maestro, id:string){
    return this.http.put(`${urlBase}/alumnos/${id}`, maestro, this.headers)
  }

  addMaestroMateria(materiaId:string, idUsuario:string ){
    const administradores = idUsuario
    return this.http.put(`${urlBase}/materias/actualizarAdmin/${materiaId}`, {'administradores':administradores}, this.headers)

  }

  getMaestros(desde: number = 0){
    return this.http.get<maestrosResponse>(`${urlBase}/maestros?desde=${desde}`, this.headers)
  }
  getMaestro(id:string){
    return this.http.get<{ok:boolean, maestro:maestro}>(`${urlBase}/maestros/${id}`, this.headers)
           .pipe(
            map(item=>{
              return item.maestro
            })
           )
  }
  getMateriasMaestro(idMaestro:string){
    return this.http.get<{ok:boolean, materias:materias[]}>(`${urlBase}/materias/materias-maestro/${idMaestro}`, this.headers)
    .pipe(
      map(item=>{
        return item.materias
      })
    )
  }

  get headers(): object{
    return {
      headers: {
        'x-token': this.token
      }
    };
  }
  get token(): string{
    return localStorage.getItem('token') || '';
  }
}
