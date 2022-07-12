import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { MateriasService } from 'src/app/services/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
    `.sidebar {
      width: 6.5rem;
      min-height: 200vh;
  }`
  ]
}) 
export class UsuarioComponent implements OnInit, OnDestroy {
  private imgSubs: Subscription;
  alumnoSeleccionado:alumno;
  materiaSeleccionada:string;
  materias:materias[];
  idAlumno:string
  

  alumnoForm = this.fb.group({
    nombre:['',[Validators.required]],
    apellido1:['',[Validators.required]],
    apellido2:[''],
    matricula:['',[Validators.required]],
    email:['',[Validators.required]],
    materia:['',[Validators.required]],
    cuatrimestre:['',[Validators.required]],
    carrera:['',[Validators.required]]
  })

  constructor(
              private activatedRouter:ActivatedRoute,
              private alumnoService:AlumnosService,
              private fb:FormBuilder,
              private materiasService:MateriasService,
              private imgModalService:ImgModalServiceService
              ) {
                
               }

  ngOnInit(): void {
    this.getMaterias();
    this.activatedRouter.params.subscribe(params=>{
      this.idAlumno = params['id']
      
      this.cargarAlumno(this.idAlumno)
    })

    this.imgSubs = this.imgSubs = this.imgModalService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarAlumno(this.idAlumno);

      })
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  cargarAlumno(id:string){


    this.alumnoService.getAlumno(id)
    .subscribe(alumno=>{
      this.alumnoSeleccionado=alumno;
      this.materiaSeleccionada = alumno.materia._id
      console.log('materia: ',this.materiaSeleccionada);
      this.alumnoForm.get('materia').setValue(alumno.materia._id)

      this.alumnoForm.setValue({
        nombre:this.alumnoSeleccionado.nombre,
        apellido1:this.alumnoSeleccionado.apellido1,
        apellido2:this.alumnoSeleccionado.apellido2||'',
        matricula:this.alumnoSeleccionado.matricula,
        email:this.alumnoSeleccionado.email,
        materia:this.alumnoSeleccionado.materia._id,
        cuatrimestre:this.alumnoSeleccionado.cuatrimestre,
        carrera:this.alumnoSeleccionado.carrera
      })


      console.log(this.alumnoForm);
    })
  }


  getMaterias(){
    this.materiasService.getMaterias()
    .subscribe(materias=>{
      this.materias = materias;
    })
  }

  guardarAlumno(){
    const materiaSeleccionadaForm= this.alumnoForm.get('materia').value
    console.log(materiaSeleccionadaForm);
    console.log(this.materiaSeleccionada);
  
      Swal.fire({
        title:'Estas seguro?',
        text:'Deseas realizar estos cambios',
        icon:'warning',
      })
      .then(resp=>{
        if(resp.isConfirmed){
          this.alumnoService.updateAlumno(this.alumnoForm.value, this.alumnoSeleccionado._id)
          .subscribe(resp=>{
            this.cargarAlumno(this.alumnoSeleccionado._id)
          })

        }
      })
    
  }
  mostrarimgModal(usuario: alumno) {
    this.imgModalService.abrirModal('usuario', usuario._id, usuario.img);

  }
}
