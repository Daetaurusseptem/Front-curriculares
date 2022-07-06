import { maestro } from "./maestro.interface"

export interface maestrosResponse{
    ok:boolean
    info:String
    usuarios:maestro[]
    total:number
}