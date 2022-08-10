import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { materiasAsistencias } from 'src/app/interfaces/materiasConAsistencias.interface copy';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  id=''
  materia:materiasAsistencias;
  alumnos:alumno[];

  totalUsuarios:number;
  alumnosTemp!:alumno[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private materiaService:MateriasService,
    private alumnosService:AlumnosService,
    private usuarioService:UsuarioService,
    private imgModalService:ImgModalServiceService,
    private busquedaService:BusquedaService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp=>{
      console.log(resp['id']);
      this.id = resp['id']
      this.cargarMateria()
    })
  }





  cargarMateria(){
    this.materiaService.getMateria(this.id)
    .subscribe(resp=>{
      this.materia = resp
      this.alumnos = resp.inscritos
      console.log(this.materia);
    })
  }
  mostrarimgModal(usuario: alumno){
    this.imgModalService.abrirModal('usuario', usuario._id, usuario.img);
  }

  eliminarAlumnoMateria(id:string){
    console.log('eliminar ',id);


    Swal.fire({
      title:'Estas Seguro?',
      icon:'warning',
      text:`desea eliminarlo?`,
      showCancelButton:true,
      cancelButtonText:'cancelar'
    }).then(resp=>{
      if(resp.value){
        this.materiaService.deleteAlumno(this.materia._id, id)
        .subscribe(resp=>{
          console.log(resp);
          Swal.fire('Alumno Eliminado', 'El alumno ha sido eliminado exitosamente', 'success')
          this.cargarMateria();
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })


  }
  buscar(termino: string): any{
    //si la busqueda es 0 los usuarios guardados en usuarios temp se asignan de nuevo
    if (termino.length === 0 ){
      this.alumnos = [...this.alumnosTemp];
      return;
    }

    this.busquedaService.buscar('alumnos', termino)
    .subscribe( (resultados: any[]) => {
      console.log(resultados);
      this.alumnos = resultados;
    });
  }

}
