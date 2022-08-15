import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[
    `
    .gradient-custom-2 {
/* fallback for old browsers */
background: #fccb90;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background-image:url('../../../assets/img/logo-oscuro.png')
}

.gradient-custom-3{
  background: rgb(117,157,1);
  background: linear-gradient(90deg, rgba(117,157,1,0.4990371148459384) 0%, rgba(117,157,1,1) 100%);
}

@media (min-width: 768px) {
.gradient-form {
height: 100vh !important;
}
}
@media (min-width: 769px) {
.gradient-custom-2 {
border-top-right-radius: .3rem;
border-bottom-right-radius: .3rem;
}
}`
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
    this.usuarioService.borrarLocalStorage()
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
