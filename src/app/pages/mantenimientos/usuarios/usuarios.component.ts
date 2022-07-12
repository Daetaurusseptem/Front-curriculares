import { Component, OnDestroy, OnInit } from '@angular/core';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { alumnosResponse } from 'src/app/interfaces/alumnoResponse.interface';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { delay, map } from 'rxjs/operators';
import { Usuario } from 'src/models/usuario.model';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  alumnos:alumno[];
  desde=0;
  cargando=false;
  totalUsuarios:number;
  usuariosTemp:alumno[];
  private imgSubs: Subscription;

  constructor(
    private alumnosService:AlumnosService,
    private usuarioService:UsuarioService,
    private imgModalService:ImgModalServiceService
    ) { 
      this.cargarUsuarios();
      this.imgSubs = this.imgSubs = this.imgModalService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarUsuarios();

      })
  }

  ngOnDestroy(): void {
  
    this.imgSubs.unsubscribe()
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
    this.alumnosService.getAlumnos(this.desde)
      .subscribe(({ usuarios, total }) => {
        this.totalUsuarios = total
        this.alumnos = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cargarUsuarios(){
    this.alumnosService.getAlumnos()
    .pipe(
      map(item=>{
        this.totalUsuarios = item.total;
        return item.usuarios
      })
    )
    .subscribe(resp=>{
      
      this.alumnos = resp
    })
  }
  eliminarAlumno(usuario:alumno){
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
  mostrarimgModal(usuario: alumno){
    this.imgModalService.abrirModal('usuario', usuario._id, usuario.img);
  }
}
