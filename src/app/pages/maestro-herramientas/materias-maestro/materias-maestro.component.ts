import { Component, OnInit } from '@angular/core';
import { maestro } from 'src/app/interfaces/maestro.interface';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-materias-maestro',
  templateUrl: './materias-maestro.component.html',
  styles: [
  ]
})
export class MateriasMaestroComponent implements OnInit {
  id:string=''
  maestro:maestro;
  materias:materias[]
  constructor(
    private maestroService:MaestrosService,
    private usuarioService:UsuarioService,
    private imgModalService:ImgModalServiceService
  ) {
    this.id=this.usuarioService.usuario._id;
    this.getMaestroMaterias();
    this.getMaestroMaterias();
  }

  ngOnInit(): void {
  }


  getMaestroMaterias(){
   this.maestroService.getMateriasMaestro(this.id)
   .subscribe(materias=>{
    this.materias=materias
   })
  }

  mostrarimgModal(materia: materias) {
    this.imgModalService.abrirModal('materia', materia._id, materia.img);

  }
}
