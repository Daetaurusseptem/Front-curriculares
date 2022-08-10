export interface alumno{
_id:string
nombre:String
apellido1:String
apellido2:String
email:String
password:String
img:string
cuatrimestre:String
carrera:String
matricula:String
materia:{
    nombre:String,
    _id:string
}
role:'alumno'
google:String,
asistencias:[{
  fecha:Date,
  asistio:Boolean
}]

}
