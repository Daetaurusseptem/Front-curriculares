import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay, map, Subscription } from 'rxjs';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { maestro } from 'src/app/interfaces/maestro.interface';
import { Evento } from 'src/app/interfaces/evento.interface';
import { EventoPopulado } from 'src/app/interfaces/eventoPopulado.interface';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { MateriasService } from 'src/app/services/materias.service';
import Swal from 'sweetalert2';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styles: [
  ]
})
export class EventoComponent implements OnInit {
  private imgSubs: Subscription;
  eventoSeleccionado:EventoPopulado;
  materiaSeleccionada:string;
  alumnosAsistiranId:any[]=[];
  alumnosAsistiran:alumno[]=[];
  idAlumno:string
  realizadores:maestro[]=[]
  realizadorSeleccionado:maestro
  agregarAdmin:Boolean=false
  maestrosDisponibles:any[]

  eventoForm = this.fb.group({
    nombre:[''],
    descripcion:[''],
    realizador:['']
  })

  realizadorForm = this.fb.group({
    id:[]
  })

  agregarRealizadorForm= this.fb.group({
    id:[]
  })

  constructor(
              private activatedRouter:ActivatedRoute,
              private alumnoService:AlumnosService,
              private maestrosService:MaestrosService,
              private fb:FormBuilder,
              private materiasService:MateriasService,
              private imgModalService:ImgModalServiceService,
              private eventosService:EventosService
              ) {
                this.realizadorForm.get('id').valueChanges
                .subscribe(realizadorId => {

                  this.realizadorSeleccionado = this.realizadores.find(a => a._id === realizadorId)
                  if (!this.realizadorSeleccionado) {
                    this.agregarAdmin = true
                  } else {
                    this.agregarAdmin = false
                  }

                })
               }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      this.idAlumno = params['id']

      this.cargarEvento(this.idAlumno)
    })

    this.imgSubs = this.imgSubs = this.imgModalService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarEvento(this.idAlumno);

      })
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  cargarEvento(id:string){


    this.eventosService.getEvento(id)
    .subscribe(evento=>{
      this.eventoSeleccionado=evento;
      console.log(this.eventoSeleccionado);
      this.cargarMaestrosDisponibles();
      this.alumnosAsistiran = evento.asistira||[]
      this.realizadores = evento.realizadores

      this.eventoForm.setValue({
        nombre:this.eventoSeleccionado.nombre,
        descripcion:this.eventoSeleccionado.descripcion,
        realizador:this.eventoSeleccionado.realizadores||''
      })


      console.log(this.eventoForm);
    })
  }


  guardarEvento(){

    console.log(this.eventoForm);

      Swal.fire({
        title:'Estas seguro?',
        text:'Deseas realizar estos cambios',
        icon:'warning',
      })
      .then(resp=>{
        if(resp.isConfirmed){
          this.eventosService.updateEvento(this.eventoSeleccionado._id,this.eventoForm.value)
          .subscribe(resp=>{
            this.cargarEvento(this.eventoSeleccionado._id)
          })

        }
      })

  }
  mostrarimgModal(evento: EventoPopulado) {
    this.imgModalService.abrirModal('usuario', evento._id, evento.img);

  }

  agregarRealizador(){
    const adminAgregar = this.agregarRealizadorForm.get('id').value
    console.log(adminAgregar);

    Swal.fire({
      title:'Deseas Agregar?',
      text:`Deseas Agregarlo`,
      showCancelButton:true,
      cancelButtonText:'cancelar',
      confirmButtonText:'aceptar'
    })
    .then(resp=>{
      if(resp.isConfirmed){
        this.eventosService.addRealizadorEvento(this.eventoSeleccionado._id, adminAgregar)
        .subscribe(resp=>{
          this.cargarEvento(this.eventoSeleccionado._id);
          Swal.fire('Instructor Agregado','','success')
        })

      }
    })
  }

  eliminarRealizador(){
    Swal.fire({
      title:'Estas seguro?',
      text:`eliminar a ${this.realizadorSeleccionado.nombre}`,
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }
      ).then(resp=>{
      if(resp.isDenied || resp.isDismissed){
        return
      }
      console.log('paso');
      this.eventosService.deleteInstructor(this.eventoSeleccionado._id,this.realizadorSeleccionado._id, )
      .subscribe(resp=>{
        this.cargarEvento(this.eventoSeleccionado._id);
        Swal.fire('Instructor Eliminado', '','success')
        this.realizadorSeleccionado = this.realizadores.find(a=>a[0]||'')
      })
    }
    )
  }
  cargarMaestrosDisponibles(){
    this.maestrosService.getMaestros()
    .subscribe(resp=>{
      var administradoresCompleto = resp.usuarios

      var registrados = this.realizadores.map(el=>el._id)

      var nuevos = administradoresCompleto.filter(e=>{
        if(registrados.includes(e._id)){
          return ''
        }else{
          return JSON.stringify(e._id)
        }

      })

      this.maestrosDisponibles = nuevos
      console.log(this.maestrosDisponibles);
    })
  }
}
