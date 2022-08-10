import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Evento } from 'src/app/interfaces/evento.interface';
import { map } from 'rxjs';
import { EventoPopulado } from '../interfaces/eventoPopulado.interface';

const urlBase= environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http:HttpClient) { }

  addRealizadorEvento(eventoId:string, IdRealizador:string){
    const administradores = IdRealizador
    return this.http.put(`${urlBase}/eventos/actualizarRealizador/${eventoId}`, {'realizadores':administradores}, this.headers)

  }
  addAsistenciaEvento(eventoId:string, usuarioId:string){

    return this.http.put(`${urlBase}/eventos/agregar-asistencia/:${eventoId}/:${usuarioId}`, {}, this.headers)


  }




  createEvento(evento:Evento){
    return this.http.post<{ok:Boolean, evento:Evento}>(`${urlBase}/eventos`, evento,this.headers)
  }

  getEvento(id:string){
    return this.http.get<{ok:boolean, evento:EventoPopulado}>(`${urlBase}/eventos/${id}`,this.headers)
    .pipe(
      map(item=>{
        console.log(item);
        return item.evento
      })
    )
  }
  getEventos(){
    return this.http.get<{ok:boolean, eventos:Evento[]}>(`${urlBase}/eventos`,this.headers)
    .pipe(
      map(item=>{
        return item.eventos
      })
    )
  }
  getEventosPopulados(){
    return this.http.get<{ok:boolean, eventos:EventoPopulado[]}>(`${urlBase}/eventos`,this.headers)
    .pipe(
      map(item=>{
        return item.eventos
      })
    )
  }

  updateEvento(id:string, data:{nombre:string, descripcion:string}){
    return this.http.put(`${urlBase}/eventos/${id}`, data, this.headers)
  }
  deleteEvento(idEvento:string){
    return this.http.delete(`${urlBase}/eventos/${idEvento}`, this.headers )
  }
  deleteInstructor(idEvento:string, idUsuario:string){
    return this.http.delete(`${urlBase}/eventos/${idEvento}/${idUsuario}`, this.headers)
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
