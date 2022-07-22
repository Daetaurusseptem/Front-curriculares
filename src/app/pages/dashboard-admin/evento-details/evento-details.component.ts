import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoPopulado } from 'src/app/interfaces/eventoPopulado.interface';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-evento-details',
  templateUrl: './evento-details.component.html',
  styleUrls: ['./evento-details.component.css']
})
export class EventoDetailsComponent implements OnInit {
  eventoSeleccionado:EventoPopulado
  constructor(
                private activateRoute:ActivatedRoute,
                private eventosService:EventosService
                ) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(r=>{
      this.cargarEvento(r['id'])
      console.log(this.eventoSeleccionado);
    })

  }

  cargarEvento(id:string){
    this.eventosService.getEvento(id)
    .subscribe(evento=>{
      this.eventoSeleccionado=evento;
    })
  }

}
