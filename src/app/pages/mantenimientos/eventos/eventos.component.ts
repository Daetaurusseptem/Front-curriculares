import { Component, OnInit } from '@angular/core';
import { delay, map, Subscription } from 'rxjs';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { Evento } from 'src/app/interfaces/evento.interface';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styles: [
  ]
})
export class EventosComponent implements OnInit {
  eventos:Evento[];
  desde=0;
  cargando=false;
  totalEventos:number;
  eventoTemp:Evento[];
  private imgSubs: Subscription;

  constructor(
    private alumnosService:AlumnosService,
    private usuarioService:UsuarioService,
    private imgModalService:ImgModalServiceService,
    private materiaService:MateriasService,
    private eventosService: EventosService
    ) {
      this.cargarEventos();
      this.imgSubs = this.imgSubs = this.imgModalService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {

        this.cargarEventos();

      })
  }

  ngOnDestroy(): void {

    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
  }



  cargarEventos(){
    this.eventosService.getEventos()
    .subscribe(resp=>{

      this.eventos = resp
      console.log(this.eventos);
    })
  }
  eliminarEvento(evento:Evento){
    Swal.fire({
      title:'Estas Seguro?',
      icon:'warning',
      text:`desea eliminar a ${evento.nombre}?`,
      showCancelButton:true,
      cancelButtonText:'cancelar'
    }).then(resp=>{
      if(resp.value){
        this.eventosService.deleteEvento(evento._id)
        .subscribe(resp=>{
          this.cargarEventos();
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
  mostrarimgModal(evento: Evento){
    this.imgModalService.abrirModal('evento', evento._id, evento.img);
  }

  cargarMateriaNombre(id:string){

    return this.materiaService.getMateria(id)
    .pipe(
      map(item=>{
        return item.nombre
      })
    )


  }
}
