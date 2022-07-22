import { administrador } from "./administradores.interface"
import { Horario } from "./horario.interface"

export interface materias{
    _id:string
    nombre:string
    descripcion:string,
    horarios:Horario[]
    img:string
        administradores:[
           administrador
        ]
}
