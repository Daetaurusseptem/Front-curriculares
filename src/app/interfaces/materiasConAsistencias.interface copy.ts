import { administrador } from "./administradores.interface"
import { alumno } from "./alumno.interface"
import { Horario } from "./horario.interface"

export interface materiasAsistencias{
    _id:string
    nombre:string
    descripcion:string,
    horarios:Horario[]
    img:string
    administradores:[
           administrador
        ],
    inscritos:[alumno]
}
