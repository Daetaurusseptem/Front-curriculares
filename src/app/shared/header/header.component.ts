import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  usuario:Usuario
  constructor(
    private usuarioService:UsuarioService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.usuario= this.usuarioService.usuario
  }

  logOut(){
    this.usuarioService.borrarLocalStorage();
    this.router.navigateByUrl('/login')
  }

}
