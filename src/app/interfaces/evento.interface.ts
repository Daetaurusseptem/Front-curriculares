export interface Evento{
  _id?:string,
  nombre:string,
  descripcion:string,
  realizadores:string,
  horario:{
    empieza:Date,
    termina:Date,
  },
  img?:string,
  asistira?:[
    {
      alumno:string
    }
  ]

}
