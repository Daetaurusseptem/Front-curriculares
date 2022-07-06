
export class Usuario {

    constructor(
        public id: string,
        public nombre: string,
        public apellido1:string,
        public email: string,
        public cuatrimestre?:string,
        public carrera?:string,
        public matricula?:string,
        public materia?:string,
        public servicioSocial?:{status:boolean, horas:Number},
        public apellido2?:string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
    ) {}

    // tslint:disable-next-line: typedef
    // imprimirUsuario(){
    //     console.log(this.nombre);
    // }
}

