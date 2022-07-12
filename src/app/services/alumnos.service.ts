import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { alumno } from '../interfaces/alumno.interface';
import { alumnosResponse } from '../interfaces/alumnoResponse.interface';

const url_base = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient) { }

  updateAlumno(alumno:alumno, id:string){
    return this.http.put(`${url_base}/alumnos/${id}`, alumno, this.headers)
  }

  getAlumnos(desde: number = 0){
    return this.http.get<alumnosResponse>(`${url_base}/alumnos?desde=${desde}`, this.headers)
  }
  getAlumno(id:string){
    return this.http.get<{ok:boolean, alumno:alumno}>(`${url_base}/alumnos/${id}`, this.headers)
    .pipe(
      map(item=>{
        return item.alumno
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
