import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements OnInit {
  menuItems: any[]=[];
  usuario:Usuario;
  constructor(
    private sideBarService:SidebarService,
    private usuarioService:UsuarioService
    ) {
    this.menuItems = this.sideBarService.menu
    this.usuario = usuarioService.usuario
   }

  ngOnInit(): void {
  }

}
