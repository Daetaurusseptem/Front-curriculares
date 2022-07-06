import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { MateriasService } from 'src/app/services/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styles: [
  ]
})
export class MateriasComponent implements OnInit {
  totalUsuarios=0;
  materias:materias[]=[]
  totalMaterias:number;
  materiasTemp:materias[];

  constructor(private materiasService:MateriasService) { }

  ngOnInit(): void {
    this.cargarMaterias();
      }
  

    cargarMaterias(){
      this.materiasService.getMaterias()
      .subscribe(resp=>{
        console.log(resp);
        this.materias = resp
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
  
  }
  
 
