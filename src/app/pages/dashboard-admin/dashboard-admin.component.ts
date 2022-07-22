import { Component, OnInit } from '@angular/core';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { Evento } from 'src/app/interfaces/evento.interface';
import { EventoPopulado } from 'src/app/interfaces/eventoPopulado.interface';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  alumnosAsistiran:alumno[]
  eventos:EventoPopulado[]
  constructor(private eventosService:EventosService) { }

  ngOnInit(): void {
    this.cargarEventos()
  }

  cargarEventos(){
    this.eventosService.getEventosPopulados()
    .subscribe(eventos=>{
      this.eventos = eventos
    })

  }
}
