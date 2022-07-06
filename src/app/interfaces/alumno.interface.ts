export interface alumno{
_id:String
nombre:String
apellido1:String
apellido2:String
email:String
password:String
img:String
cuatrimestre:String
carrera:String
matricula:String
materia:{
    nombre:String,
    _id:String
}
role:'alumno'
google:String

}