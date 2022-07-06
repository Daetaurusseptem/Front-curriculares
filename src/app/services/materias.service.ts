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
    return this.http.put(`${url_base}/materias/alumno/${alumnoId}/${materiaId}`,{})
  }
  
  deleteMateria(id:string){
    return this.http.delete(`${url_base}/materias/${id}`)
  }
}
