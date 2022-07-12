import { Component, OnInit } from '@angular/core';
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
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuario= this.usuarioService.usuario
  }

}
