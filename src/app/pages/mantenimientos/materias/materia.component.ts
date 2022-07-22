import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay, map, Subscription } from 'rxjs';
import { administrador } from 'src/app/interfaces/administradores.interface';
import { maestro } from 'src/app/interfaces/maestro.interface';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styles: [
  ]
})
export class MateriaComponent implements OnInit, OnDestroy {
  private imgSubs: Subscription;
  agregarAdmin:boolean;
  maestrosDisponibles:any[]
  instructoragregarAdminSeleccionado:administrador;
  administradores:administrador[];
  instructorSeleccionado:administrador
  idMateria:string=''
  materia:materias

  materiaForm = this.fb.group({
    nombre:['',[Validators.required]],
    descripcion:['',[Validators.required]]
  })

  agregarAdminForm= this.fb.group({
    id:['']
  })

  asesorForm = this.fb.group({
    id:['']
  })
  constructor(
    private activatedRoute: ActivatedRoute,
    private materiasService: MateriasService,
    private fb: FormBuilder,
    private maestrosService: MaestrosService,
    private imgModalService: ImgModalServiceService
  ) {

    this.asesorForm.get('id').valueChanges
      .subscribe(administradorId => {

        this.instructorSeleccionado = this.administradores.find(a => a._id === administradorId)
        if (!this.instructorSeleccionado) {
          this.agregarAdmin = true
        } else {
          this.agregarAdmin = false
        }

      })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any)=>{
      this.idMateria = params.id;
      this.cargarMateria(this.idMateria)

      this.imgSubs = this.imgSubs = this.imgModalService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarMateria(this.idMateria);

      })


    })
  }

  cargarMateria(id:string){
    this.materiasService.getMateria(id).
    subscribe(materia=>{
      this.materia=materia
      this.administradores = materia.administradores
      this.cargarMaestrosDisponibles()
      this.materiaForm.setValue({nombre:materia.nombre, descripcion:materia.descripcion});
    })
  }
  //TODO Cargar asesores

  guardarMateria(materia:materias){
   const data={
     nombre:this.materiaForm.get('nombre').value,
     descripcion:this.materiaForm.get('descripcion').value
   }
    console.log(data);
    this.materiasService.updateMateria(materia._id, data)
    .subscribe(resp=>{
      Swal.fire('Materia Actualizada',`${materia.nombre} ha sido actualizado su registro`)
    })
  }

  eliminarInstructor(idUsuario:string){
    Swal.fire({
      title:'Estas seguro?',
      text:`eliminar a ${this.instructorSeleccionado.nombre}`,
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    }
      ).then(resp=>{
      if(resp.isDenied || resp.isDismissed){
        return
      }
      this.materiasService.deleteInstructor(this.materia._id,idUsuario)
      .subscribe(resp=>{
        this.cargarMateria(this.materia._id);
        Swal.fire('Instructor Eliminado', '','success')
        this.instructorSeleccionado= this.administradores.find(a=>a[0]||'')
      })
    }
    )

  }

  cargarMaestrosDisponibles(){
    this.maestrosService.getMaestros()
    .subscribe(resp=>{
      var administradoresCompleto = resp.usuarios

      var registrados = this.administradores.map(el=>el._id)

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

  agregarInstructor(){
    const adminAgregar = this.agregarAdminForm.get('id').value
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
        this.maestrosService.addMaestroMateria(this.materia._id, adminAgregar)
        .subscribe(resp=>{
          this.cargarMateria(this.materia._id);
          Swal.fire('Instructor Agregado','','success')
        })

      }
    })
  }

  mostrarimgModal(usuario: materias) {
    this.imgModalService.abrirModal('materia', usuario._id, usuario.img);

  }
}
