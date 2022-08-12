import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoPopulado } from 'src/app/interfaces/eventoPopulado.interface';
import { EventosService } from 'src/app/services/eventos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-evento-details',
  templateUrl: './evento-details.component.html',
  styleUrls: ['./evento-details.component.css']
})
export class EventoDetailsComponent implements OnInit {
  eventoSeleccionado:EventoPopulado
  usuarioId:string
  asistencia:boolean;
  idEvento:string;
  constructor(
                private activateRoute:ActivatedRoute,
                private eventosService:EventosService,
                private usuarioService:UsuarioService
                ) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(r=>{
      this.idEvento = r['id'];
      this.cargarEvento(r['id'])
    })


  }

  cargarEvento(id:string){
    this.eventosService.getEvento(id)
    .subscribe(evento=>{
      this.eventoSeleccionado=evento;
      this.comprobarAsistencia()
    })
  }
  addAsistenciaEvento(){
    this.usuarioId = this.usuarioService.id;
    this.eventosService.addAsistenciaEvento(this.eventoSeleccionado._id, this.usuarioId)
    .subscribe(resp=>{
      console.log(resp);
      this.cargarEvento(this.eventoSeleccionado._id)
      this.asistencia = true
    })
  }

  deleteAsistencia(){
    this.eventosService.deleteAsistenciaEvento(this.eventoSeleccionado._id, this.usuarioService.id)
    .subscribe(
      r=>{
        console.log(r);
        this.cargarEvento(this.eventoSeleccionado._id)
        this.asistencia = false

      }
    )
  }

  comprobarAsistencia( ){
    this.usuarioId = this.usuarioService.id;
    console.log(this.usuarioId);
    return this.eventosService.comprobarAsistencia(this.eventoSeleccionado?._id, this.usuarioId)
    .subscribe(r=>{
      this.asistencia = r
      console.log(this.asistencia);
    })
  }
}
