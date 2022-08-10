import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AsistenciaAlumnoResponse } from '../interfaces/asistenciasAlumnoResponse.interface';
import { materiasResponse } from '../interfaces/materias.interface';
import { materiasAsistencias } from '../interfaces/materiasConAsistencias.interface copy';
import { materias } from '../interfaces/materiasSimple.interface';

const url_base = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http: HttpClient) { }

  crearMateria(materiaForm:{nombre:string,descripcion:string}){
    console.log('front end materia form service'+materiaForm.nombre);
    return this.http.post<{ok:boolean, materia:materias}>(`${url_base}/materias`, materiaForm, this.headers)
  }

  deleteInstructor(idMateria:string, idUsuario:string){
    return this.http.delete(`${url_base}/materias/${idMateria}/${idUsuario}`, this.headers)
  }
  deleteAlumno(idMateria:string, idUsuario:string){
    return this.http.delete(`${url_base}/materias/eliminar-inscrito/${idMateria}/${idUsuario}`, this.headers)
  }





  updateMateria(id:string ,materia:{nombre:string, descripcion:string}){
    return this.http.put(`${url_base}/materias/${id}`, {materia:materia}, this.headers)
  }

  getMaterias(){
    return this.http.get<materiasResponse>(`${url_base}/materias`)
    .pipe(
      map((resp)=>{
        return resp.materias
      })
    )
  }
  getMateria(id:string){
    return this.http.get<{ok:boolean, materia:materiasAsistencias}>(`${url_base}/materias/${id}`, this.headers)
    .pipe(
      map(item=>{
        return item.materia
      })
    )

  }


  getMateriaAsistencia(id:string){
    return this.http.get<AsistenciaAlumnoResponse>(`${url_base}/materias/asistencia/${id}`,this.headers)
    .pipe(
      map(item=>{return item.asistencias[0].asistencias})
    )
  }


  getMateriaAsistenciaDia(id:string, dia:number, mes:number){
    return this.http.get<{asistencia:boolean}>(`${url_base}/materias/asistencia/${id}?mes=${mes}&dia=${dia}`,this.headers)


  }

  getMateriaAlumnos(id:string){
    return this.http.get<{ok:boolean, materia:materias}>(`${url_base}/materias/${id}`)
    .pipe(
      map(item=>{
        return item.materia
      })
    )

  }

  addUser(materiaId:string, alumnoId:string){
    return this.http.put(`${url_base}/materias/alumno/${alumnoId}/${materiaId}`,{_id:alumnoId,inscritos:{_id:alumnoId,asistencias:{}}}, this.headers)
  }

  deleteMateria(id:string){
    return this.http.delete(`${url_base}/materias/${id}`,this.headers)
  }

  limiteDisponible(idMateria:string){
    return this.http.get<{ok:boolean,numero:number}>(`${url_base}/materias/contar/${idMateria}`,this.headers)
    .pipe(
      map(r=>{return r.numero})
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
  // get role():'ADMIN_ROLE'|'USER_ROLE'{
  //   return this.usuario.role
  // }

  // get uid(): string{
  //   return this.usuario.uid || '';
  // }
  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );
  }
  borrarLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
}
}
