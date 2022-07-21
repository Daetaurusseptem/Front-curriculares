export interface Evento{
  _id?:string,
  nombre:string,
  descripcion:string,
  realizador:string,
  horario:{
    empieza:Date,
    termina:Date,
  },
  asistira?:[
    {
      alumno:string
    }
  ],
  img?:string



}
