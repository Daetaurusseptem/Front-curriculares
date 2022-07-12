import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styles: [
  ]
})
export class CrearMateriaComponent implements OnInit {

  formSubmitted=false;

  public crearMateriaForm = this.fb.group({
    nombre:['', Validators.required],
    descripcion:['',Validators.required],
  }
  )
  

  constructor(
              private fb: FormBuilder,
              private usuariosService:UsuarioService,
              private router:Router,
              private materiasService:MateriasService
    ) {
     }

  ngOnInit(): void {
  }

  crearMateria() {

    this.formSubmitted = true;

    if (this.crearMateriaForm.invalid) {
      console.log('no valido');
      console.log(this.crearMateriaForm.value);
      return;
    }
    
    console.log(this.crearMateriaForm.value);

    this.materiasService.crearMateria(this.crearMateriaForm.value)
    .subscribe(
      resp=>{
      
      
          Swal.fire({
            title:'Materia creado',
            text:`la materia ${resp.materia.nombre} ha sido creada`
          })     
            this.router.navigateByUrl(`/dashboard/materia/${resp.materia._id}`)
          
    })
  }

  campoNoValido(campo:string):boolean{
    if ( this.crearMateriaForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }
}
