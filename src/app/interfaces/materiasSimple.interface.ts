import { administrador } from "./administradores.interface"

export interface materias{
    _id:string
    nombre:string
        descripcion:string
        img:string
        administradores:[
           administrador
        ]
}