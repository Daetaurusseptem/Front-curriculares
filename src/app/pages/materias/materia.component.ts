import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styles: [
  ]
})
export class MateriaComponent implements OnInit {
  materiaForm = this.fb.group({
    nombre:['',[Validators.required]],
    descripcion:['',[Validators.required]]
  })
  constructor(
              private activatedRoute:ActivatedRoute,
              private materiasService:MateriasService,
              private fb:FormBuilder
              ) { }
  idMateria:string=''
  materia:materias

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any)=>{
      this.idMateria = params.id;
      this.cargarMateria(this.idMateria)
    })
  }

  cargarMateria(id:string){
    this.materiasService.getMateria(id).
    subscribe(resp=>{
      this.materia=resp
    })
  }
  //TODO Cargar asesores
  
  guardarMateria(){
    console.log(this.materiaForm.value);
  }

}
