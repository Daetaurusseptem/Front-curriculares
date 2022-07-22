import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] =[]

  constructor(){
    this.cargarMenu()
  }

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!)||[];
    console.log(this.menu);
  }
  // [
  //   {
  //     title:'mantenimientos',
  //     icon:'fas fa-fw fa-cog',
  //     descripcion:'Administre los usuarios registrados',
  //     submenu:[
  //       {title:'Alumnos', url:'alumnos'},
  //       {title:'Maestros', url:'maestros'},
  //       {title:'Materias', url:'materias'},
  //       {title:'Eventos', url:'eventos'},
  //       {title:'Crear Maestro', url:'crear-maestro'},
  //       {title:'Crear Materia', url:'materias/crear-materia'},
  //       {title:'Crear Evento', url:'crear-evento'},
  //     ]
  //   },
  //   {
  //     title:'Herramientas maestro',
  //     icon:'fas fa-fw fa-cog',
  //     descripcion:'Herramientas de administracion para maestro',
  //     submenu:[
  //       {title:'materias', url:'materias-maestros'}
  //     ]
  //   }

  // ]

}
