import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { materiasResponse } from '../interfaces/materias.interface';
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
    return this.http.get<{ok:boolean, materia:materias}>(`${url_base}/materias/${id}`)
    .pipe(
      map(item=>{
        return item.materia
      })
    )
    
  }

  addUser(materiaId:string, alumnoId:string){
    return this.http.put(`${url_base}/materias/alumno/${alumnoId}/${materiaId}`,{}, this.headers)
  }
  
  deleteMateria(id:string){
    return this.http.delete(`${url_base}/materias/${id}`,this.headers)
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
