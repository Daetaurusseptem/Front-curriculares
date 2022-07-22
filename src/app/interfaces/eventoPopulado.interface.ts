import { alumno } from "./alumno.interface"
import { maestro } from "./maestro.interface"

export interface EventoPopulado{
  _id?:string,
  nombre:string,
  descripcion:string,
  realizadores:[
    maestro:maestro
  ],
  img?:string,
  horario:{
    empieza:Date,
    termina:Date,
  },
  asistira?:[
      alumno:alumno
  ],



}
