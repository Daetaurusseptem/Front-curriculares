import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { alumno } from '../interfaces/alumno.interface';
import { alumnosResponse } from '../interfaces/alumnoResponse.interface';
import { MateriasService } from './materias.service';

const url_base = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  alumnoDB:alumno;
  constructor(private http: HttpClient,
              private materiasService:MateriasService
    ) {
  }

  updateAlumno(alumno:{
    nombre:string,
    apellido1:string,
    apellido2:string,
    matricula:string,
    email:string,
    cuatrimestre:string,
    carrera:string,
    materia:string
  },idAlumno:string, materiaAnterior?:string){

    const idMateria = alumno.materia

    if(materiaAnterior){
      return this.materiasService.deleteAlumno(materiaAnterior,idAlumno)
      .subscribe(resp=>{
        console.log('eliminacion materia del alumno y materia',resp);
        this.materiasService.addUser(idMateria, idAlumno)
        .subscribe(resp=>{
          console.log('Inscripcion materia del alumno y materia',resp);
          this.http.put(`${url_base}/alumnos/${idAlumno}`, alumno, this.headers)
          .subscribe(resp=>{
            console.log(resp);
          })
      })
    })
    }else{
      this.materiasService.addUser(alumno.materia,idAlumno).subscribe(r=>{console.log(r);})
      return this.http.put(`${url_base}/alumnos/${idAlumno}`, alumno, this.headers)
          .subscribe(resp=>{
            console.log(resp);
          })
    }


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
