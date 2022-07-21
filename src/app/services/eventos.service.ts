import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Evento } from 'src/app/interfaces/evento.interface';
import { map } from 'rxjs';

const urlBase= environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http:HttpClient) { }

  createEvento(evento:Evento){
    return this.http.post<{ok:Boolean, evento:Evento}>(`${urlBase}/eventos`, evento,this.headers)
  }

  getEventos(){
    return this.http.get<{ok:boolean, eventos:Evento[]}>(`${urlBase}/eventos`,this.headers)
    .pipe(
      map(item=>{
        return item.eventos
      })
    )
  }

  updateEvento(id:string, data:{nombre:string, descripcion:string}){
    return this.http.put(`${urlBase}/horarios/${id}`, data )
  }
  deleteEvento(id:string){
    return this.http.delete(`${urlBase}/eventos/${id}`, this.headers )
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
