import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { materiasAsistencias } from 'src/app/interfaces/materiasConAsistencias.interface copy';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { MateriasService } from 'src/app/services/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-asistencias',
  templateUrl: './lista-asistencias.component.html',
  styleUrls: ['./lista-asistencias.component.css']
})
export class ListaAsistenciasComponent implements OnInit {

  id=''
  materia:materiasAsistencias;
  alumnos:alumno[]
  mesActual=new Date().getMonth();
  yearActual=new Date().getFullYear();
  diasMes:any[]
  fechaSeleccionada:Date;

  meses:any[]=[
    {nombre:'enero', numero:0},
    {nombre:'febrero', numero:1},
    {nombre:'marzo', numero:2},
    {nombre:'abril', numero:3},
    {nombre:'mayo', numero:4},
    {nombre:'junio', numero:5},
    {nombre:'julio', numero:6},
    {nombre:'agosto', numero:7},
    {nombre:'septiembre', numero:8},
    {nombre:'octubre', numero:9},
    {nombre:'noviembre', numero:10},
    {nombre:'diciembre', numero:11},


  ]


  mesSeleccionado:number;
  diaSeleccionado:number;
  yearSeleccionado:Date;


  public selectorFechaAsistenciaForm = this.fb.group({
    mes:['', Validators.required],
    dia:['',Validators.required]
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private materiaService:MateriasService,
    private asistenciasService:AsistenciasService,
    private fb:FormBuilder,

  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp=>{
      // console.log(resp['id']);
      this.id = resp['id']
      this.cargarMateria()
      this.diasDelMes(new Date().getFullYear(), new Date().getMonth())
    })
    this.selectorFechaAsistenciaForm.get('mes').valueChanges
    .subscribe(currentMonth=>{
      // console.log(currentMonth);
      this.mesSeleccionado = currentMonth;
      this.diasDelMes(this.yearActual, currentMonth)
      this.generarFecha(this.diaSeleccionado, this.mesSeleccionado)
    })
    this.selectorFechaAsistenciaForm.get('dia').valueChanges
    .subscribe(SelectedDay=>{

      this.diaSeleccionado = SelectedDay;
      // console.log(this.diaSeleccionado);console.log(this.alumnos);
      this.generarFecha(this.diaSeleccionado, this.mesSeleccionado)

    })
  }


  cargarMateria(){
    this.materiaService.getMateria(this.id)
    .subscribe(resp=>{
      this.materia = resp
      this.alumnos = resp.inscritos
      // console.log(this.alumnos);
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
  }


  agregarAsistencia(id:string){
    const fechaAsistencia = new Date(this.fechaSeleccionada);
    this.asistenciasService.addAsistencia(id,{fecha:fechaAsistencia, asistio:true})
    .subscribe(resp=>{
      // console.log(resp);
    })
  }




  generarFecha(dia:number, mes:number){
    const fecha = new Date(this.yearActual,mes, dia)
    this.fechaSeleccionada = fecha;
  }

  contieneFecha(alumno:alumno){
    const existeEnAsistencias = alumno.asistencias.some(e=>{
      // console.log(typeof this.fechaSeleccionada, typeof e.fecha);
      // console.log(new Date(e.fecha),' - ',this.fechaSeleccionada,' : ',(this.fechaSeleccionada==new Date(e.fecha) ) );
      if( new Date(e.fecha).getTime() === this.fechaSeleccionada.getTime() ){
        return true
      }
      return false
    })

    // console.log(existeEnAsistencias);
    return existeEnAsistencias
}



}
