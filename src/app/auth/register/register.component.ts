import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { map } from 'rxjs/operators';


import Swal from 'sweetalert2';

import {materias } from '../../interfaces/materiasSimple.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [

    `.gradient-custom-3{
      background: rgb(117,157,1);
    background: linear-gradient(90deg, rgba(117,157,1,0.4990371148459384) 0%, rgba(117,157,1,1) 100%);
    }`
  ]
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  numeroInscritos:number

  public registerForm = this.fb.group({
    nombre:['', Validators.required],
    apellido1:['',Validators.required],
    apellido2:[''],
    cuatrimestre:[Validators.required],
    materia:[null,Validators.required],
    carrera:[null, [Validators.required]],
    email:['', [Validators.email, Validators.required]],
    matricula:[{value:'', disabled:false}, [Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
    password:['', [Validators.required]],
    password2:['', [Validators.required]]

  },
  {
    validators:[this.passwordsIguales('password','password2')]}
  )

  materias:materias[]=[];
  constructor(
              private fb:FormBuilder,
              private usuariosService: UsuarioService,
              private router:Router,
              private materiasService : MateriasService
              ) {
                this.cargarMaterias()

               }

  ngOnInit(): void {
    this.registerForm.get('cuatrimestre').valueChanges
    .subscribe(resp=>{

      if(resp==0){

        this.registerForm.get('matricula').removeValidators([Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')])
        this.registerForm.get('matricula').disable()
      }else{
        this.registerForm.get('matricula').addValidators([Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')])
        this.registerForm.get('matricula').enable()
      }

    })
  }

  cargarMaterias(){
    this.materiasService.getMaterias()
    .subscribe((items)=>{
     this.materias = items
    })
  }

  createUser() {

    this.materiasService.limiteDisponible(this.registerForm.get('materia').value)
    .subscribe(r=>[
      this.numeroInscritos = r
    ])


    this.formSubmitted = true;

    if (this.registerForm.invalid || this.numeroInscritos>=30) {
        if(this.numeroInscritos>=30) {
          Swal.fire({
            title:'Limite alcanzado',
            text:'No puede inscribirte a esta materia',
            icon:'error'
          })
        }
      return;
    }


    const materiId =this.registerForm.get('materia').value;

    this.usuariosService.createUser(this.registerForm.value)
      .subscribe((resp:any) => {
          const idUsuario= resp.id

          return this.materiasService.addUser(materiId, idUsuario)
          .subscribe(
            resp=>{
              Swal.fire({
                title:'Alumno creado'
              })

                this.router.navigateByUrl('/')
            }
          )
      },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
          console.log(err);
        }
      )

  }


  campoNoValido(campo:string):boolean{
    if ( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

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




}
