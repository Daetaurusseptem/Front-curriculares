import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaestrosService } from 'src/app/services/maestros.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MateriasService } from 'src/app/services/materias.service';
import { materias } from 'src/app/interfaces/materiasSimple.interface';



@Component({
  selector: 'app-crear-maestro',
  templateUrl: './crear-maestro.component.html',
  styles: [
  ]
})
export class CrearMaestroComponent implements OnInit {
  
  formSubmitted=false;
  materias:materias[]=[];

  public registerMaestroForm = this.fb.group({
    nombre:['', Validators.required],
    apellido1:['',Validators.required],
    apellido2:[''],
    materia:[
      null,Validators.required],
    email:['', [Validators.email, Validators.required]],
    password:['', [Validators.required]],
    password2:['', [Validators.required]]

  },
  {
    validators:this.passwordsIguales('password','password2')}
  )
  

  constructor(
              private maestroService:MaestrosService,
              private fb: FormBuilder,
              private usuariosService:UsuarioService,
              private router:Router,
              private materiasService:MateriasService
    ) {
      this.cargarMaterias()
     }

  ngOnInit(): void {
  }

  createUser() {

    console.log('entra');
    const materiaId =this.registerMaestroForm.get('materia').value;
    this.formSubmitted = true;

    if (this.registerMaestroForm.invalid) {
      console.log('no valido');
      console.log(this.registerMaestroForm);
      return;
    }

    let idUsuario:string;
    
    this.maestroService.crearMaestro(this.registerMaestroForm.value)
    .subscribe(
      resp=>{
      idUsuario= resp.id
      console.log(idUsuario);
      return this.maestroService.addMaestroMateria(materiaId, idUsuario)
      .subscribe(
        resp=>{
          Swal.fire({
            title:'Maestro creado'
          })
          
            this.router.navigateByUrl('/dashboard')
          
        }
      )
    }
    )
   


      

  }

//ESCENCIALES
  contrasenasNoValidas() {
    const pass1 = this.registerMaestroForm.get('password')?.value;
    const pass2 = this.registerMaestroForm.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }
  passwordsIguales(pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }


    }
  }
  campoNoValido(campo:string):boolean{
    if ( this.registerMaestroForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }
  cargarMaterias(){
    this.materiasService.getMaterias()
    .subscribe((items:materias[])=>{
     this.materias = items
     console.log(this.materias);
    })
  }
}

