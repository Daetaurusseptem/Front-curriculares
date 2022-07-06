import { Component, OnInit } from '@angular/core';
import { maestro } from 'src/app/interfaces/maestro.interface';
import { MaestrosService } from 'src/app/services/maestros.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html'
})
export class MaestrosComponent implements OnInit {

  maestros:maestro[];
  desde=0;
  cargando=false;
  totalUsuarios:number;
  usuariosTemp:maestro[];

  constructor(
              private maestrosService:MaestrosService,
              private usuarioService:UsuarioService
             ) {
              
              this.cargarUsuarios()
             }

  ngOnInit(): void {
  }

  cambiarPagina(valor: number): void {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.paginar();
  }

  paginar(): void {
    this.cargando = true;
    this.maestrosService.getMaestros(this.desde)
      .subscribe(({ usuarios, total }) => {
        this.totalUsuarios = total
        this.maestros = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cargarUsuarios(){
    this.maestrosService.getMaestros()
    .pipe(
      map(item=>{
        this.totalUsuarios = item.total;
        return item.usuarios
      })
    )
    .subscribe(resp=>{
      
      this.maestros = resp
    })
  }

  eliminarmaestro(usuario:maestro){
    Swal.fire({
      title:'Estas Seguro?',
      icon:'warning',
      text:`desea eliminar a ${usuario.nombre +' '+ usuario.apellido1}?`,
      showCancelButton:true,
      cancelButtonText:'cancelar'
    }).then(resp=>{
      if(resp.value){
        this.usuarioService.deleteUser(usuario._id)
        .subscribe(resp=>{
          this.cargarUsuarios();
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
