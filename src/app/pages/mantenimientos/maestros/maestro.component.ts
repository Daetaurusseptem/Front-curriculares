import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { maestro } from 'src/app/interfaces/maestro.interface';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';
import { Usuario } from 'src/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styles: [
  ]
})
export class MaestroComponent implements OnInit,OnDestroy {
  maestroSeleccionado:maestro;
  private imgSubs: Subscription;

  maestroForm = this.fb.group({
    nombre:['',[Validators.required]],
    apellido1:['',[Validators.required]],
    apellido2:[''],
    email:['',[Validators.email]]
  })

  constructor(
              private activatedRoute:ActivatedRoute,
              private materiasService:MateriasService,
              private maestroService:MaestrosService,
              private fb:FormBuilder,
              private imgModalService:ImgModalServiceService
              ) { 
              }
  idMateria:string=''


  ngOnInit(): void {
     this.activatedRoute.params.subscribe((params:any)=>{
       this.idMateria = params.id;
       this.cargarMaestro(this.idMateria)
       this.imgSubs = this.imgSubs = this.imgModalService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarMaestro(this.idMateria);

      })
     })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

   cargarMaestro(id:string){
     this.maestroService.getMaestro(id).
     subscribe(maestro=>{
       
      this.maestroSeleccionado=maestro
      this.maestroForm.setValue({
        nombre:this.maestroSeleccionado.nombre,
        apellido1:this.maestroSeleccionado.apellido1,
        apellido2:this.maestroSeleccionado.apellido2||'',
        email:this.maestroSeleccionado.email
      })

     })
   }
  //TODO Cargar asesores
  
  guardarMaestro(){
  
    console.log(this.maestroSeleccionado);
  
      Swal.fire({
        title:'Estas seguro?',
        text:'Deseas realizar estos cambios',
        icon:'warning',
      })
      .then(resp=>{
        if(resp.isConfirmed){
          this.maestroService.updateAlumno(this.maestroForm.value, this.maestroSeleccionado._id)
          .subscribe(resp=>{
            this.cargarMaestro(this.maestroSeleccionado._id)
          })

        }
      })
    
  }


  mostrarimgModal(usuario: maestro) {
    this.imgModalService.abrirModal('usuario', usuario._id, usuario.img);

  }

}
