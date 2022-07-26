
export class Usuario {

    constructor(
        public _id: string,
        public nombre: string,
        public apellido1:string,
        public email: string,
        public role: 'admin'|'maestro'|'alumno',
        public cuatrimestre?:string,
        public carrera?:string,
        public matricula?:string,
        public materia?:string,
        public servicioSocial?:{status:boolean, horas:Number},
        public apellido2?:string,
        public password?: string,
        public img?: string,
        public google?: boolean,
    ) {}

    // tslint:disable-next-line: typedef
    // imprimirUsuario(){
    //     console.log(this.nombre);
    // }
}

