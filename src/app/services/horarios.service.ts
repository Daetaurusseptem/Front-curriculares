import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { materiasResponse } from '../interfaces/materias.interface';

const urlBase = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private http:HttpClient) { }

  crearHorario(
                idMateria:string,
                dia:'lunes'|'martes'|'miercoles'|'jueves'|'viernes',
                horas:{
                        horaInicio:number,
                        minutoInicio:number, 
                        horaTermina:number,
                        minutoTermina:number, 
                      }
               )
  {    
    const data ={
        dia,
        empiezaHora:horas.horaInicio,
        empiezaMinuto:horas.minutoInicio,
        terminaHora:horas.horaTermina,
        terminaMinuto:horas.minutoTermina  
    }
    return this.http.put(`${urlBase}/horarios/${idMateria}`, data, this.headers)
  }

  getHorarios(idMateria){
    return this.http.get<materiasResponse>(`${urlBase}/horarios/${idMateria}`, this.headers)
    .pipe(
      map(item=>{
        return item.materias
      }
      )
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
