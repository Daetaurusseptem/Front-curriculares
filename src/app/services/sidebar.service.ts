import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] =
  [
    {
      title:'mantenimientos',
      icon:'fas fa-fw fa-cog',
      descripcion:'Administre los usuarios registrados',
      submenu:[
        {title:'Alumnos', url:'alumnos'},
        {title:'Maestros', url:'maestros'},
        {title:'Materias', url:'materias'},
        {title:'Crear Maestro', url:'crear-maestro'},
        {title:'Crear Materia', url:'crear-materia'},
        {title:'Crear Evento', url:'crear-evento'},
      ]
    },
    {
      title:'Herramientas maestro',
      icon:'fas fa-fw fa-cog',
      descripcion:'Herramientas de administracion para maestro',
      submenu:[
        {title:'materias', url:'materias-maestros'}
      ]
    }

  ]
  constructor() { }


}
