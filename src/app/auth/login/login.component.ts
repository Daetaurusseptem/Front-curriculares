import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email:['', Validators.required],
    password:['',Validators.required]
  })

  constructor(
              private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private router:Router
    ) { }

  ngOnInit(): void {
  }

  login(){
    console.log('entro');
    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        // Navegar al Dashboard
        this.router.navigateByUrl('dashboard');

      }, (err: any) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }

}
