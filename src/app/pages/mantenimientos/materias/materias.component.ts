import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { maestro } from 'src/app/interfaces/maestro.interface';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { ImgModalServiceService } from 'src/app/services/img-modal-service.service';
import { MateriasService } from 'src/app/services/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styles: [
  ]
})
export class MateriasComponent implements OnInit, OnDestroy {
  totalUsuarios=0;
  materias:materias[]=[]
  totalMaterias:any;
  materiasTemp:materias[];
  private imgSubs: Subscription;

  constructor(
      private materiasService:MateriasService,
      private imgModalService:ImgModalServiceService
      ) {
        this.cargarMaterias();
    this.imgSubs = this.imgSubs = this.imgModalService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarMaterias();

      })
       }

  ngOnInit(): void {
    
      }
  
      ngOnDestroy(): void {
        this.imgSubs.unsubscribe()
      }

    cargarMaterias(){
      this.materiasService.getMaterias()
      .subscribe(resp=>{
        this.materias = resp;
        console.log(this.materias.length);
        this.totalMaterias = this.materias.length;
      })
    }
  
    eliminarMateria(materia:materias){
      Swal.fire({
        title:'Estas Seguro?',
        icon:'warning',
        text:`desea eliminar a ${materia.nombre}?`,
        showCancelButton:true,
        cancelButtonText:'cancelar'
      }).then(resp=>{
        if(resp.value){
          this.materiasService.deleteMateria(materia._id)
          .subscribe(resp=>{
            this.cargarMaterias();
          })
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
    mostrarimgModal(usuario: materias) {
      this.imgModalService.abrirModal('materia', usuario._id, usuario.img);
  
    }
  }
  
 
