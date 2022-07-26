import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-materia-maestro',
  templateUrl: './materia-maestro.component.html',
  styleUrls: ['./materia-maestro.component.css']
})
export class MateriaMaestroComponent implements OnInit {
  id=''
  materia:materias;
  constructor(
    private activatedRoute: ActivatedRoute,
    private materiaService:MateriasService
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
      console.log(this.materia);
    })
  }
}
