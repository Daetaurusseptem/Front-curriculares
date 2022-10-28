import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLinkActive } from '@angular/router';
import { alumno } from 'src/app/interfaces/alumno.interface';
import { AlumnosService } from 'src/app/services/alumnos.service';

@Component({
  selector: 'app-alumno-informacion',
  templateUrl: './alumno-informacion.component.html',
  styleUrls: ['./alumno-informacion.component.css']
})
export class AlumnoInformacionComponent implements OnInit {
  alumno:any
  constructor(private route:ActivatedRoute,private alumnoService:AlumnosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(r=>{
      this.alumnoService.getAlumno(r['idAlumno'])
      .subscribe(r=>{
        this.alumno = r
      }
      )
    })
  }

}
