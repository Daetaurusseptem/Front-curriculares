import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-lista-asistencias',
  templateUrl: './lista-asistencias.component.html',
  styleUrls: ['./lista-asistencias.component.css']
})
export class ListaAsistenciasComponent implements OnInit {

  id=''
  materia:materias;
  alumnos:alumno[]
  mesActual=new Date().getMonth();
  yearActual=new Date().getFullYear();
  diasMes:any[]
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
      this.diasDelMes(new Date().getFullYear(), new Date().getMonth())
    })
  }


  cargarMateria(){
    this.materiaService.getMateria(this.id)
    .subscribe(resp=>{
      this.materia = resp
      this.alumnos=resp.inscritos;
      console.log(this.materia);
    })
  }


  diasDelMes(year:number, month:number){

    const date = new Date(year, month, 1);


    const dates = [];

    while(date.getMonth() == month) {
      dates.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }

    this.diasMes = dates
    console.log(this.diasMes);
  }


  agregarAsistencia(dia:number, mes:number){
    console.log('asistencia mes:'+mes,'dia: ',dia);
  }


}
