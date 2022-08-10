export interface AsistenciaAlumno{
  alumno:string,
  _id:string,
  asistencias:[
    {fecha:Date, asistio:boolean, _id:string}
  ]
}
