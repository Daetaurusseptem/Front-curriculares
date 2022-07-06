export interface materias{
    _id:string
    nombre:string
        descripcion:string
        img:string
        administradores:[
           { _id:string,
            nombre:string,
            apellido1:string,
           apellido2?:string,
           email:string,
           password:string,
           img?:string,
           role:string,
           google:boolean}
        ]
}