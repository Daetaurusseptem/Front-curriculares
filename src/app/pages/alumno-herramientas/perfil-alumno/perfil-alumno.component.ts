import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario.model';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css']
})
export class PerfilAlumnoComponent implements OnInit {
  usuario:Usuario;
  private imgSubs: Subscription;
  constructor(private usuarioService:UsuarioService,
              private imgModalService:ImgModalServiceService
    ) { }

  ngOnInit(): void {
    this.cargarUsuario()

    this.imgSubs = this.imgSubs = this.imgModalService.nuevaImagen
    .pipe(
      delay(100)
      )
      .subscribe(img => {
        this.cargarUsuario()
      })
  }

  mostrarimgModal(id:string, img:string) {
    this.imgModalService.abrirModal('usuario',id, img);
  }

  cargarUsuario(){
    this.usuario  = this.usuarioService.usuario
    console.log(this.usuario);
  }

}


