import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const url_base = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  constructor(private http:HttpClient) { }
  addAsistencia(idAlumno:string, asistencia:{fecha:Date, asistio:Boolean}){
    return this.http.put(`${url_base}/asistencias/${idAlumno}`,asistencia, this.headers)
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
  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );
  }
  borrarLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
}
}
