import { alumno } from "./alumno.interface"

export interface alumnosResponse{
    ok:boolean
    info:String
    usuarios:alumno[]
    total:number
}