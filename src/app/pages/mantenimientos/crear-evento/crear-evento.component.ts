import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { maestro } from 'src/app/interfaces/maestro.interface';
import { EventosService } from 'src/app/services/eventos.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styles: [
  ]
})
export class CrearEventoComponent implements OnInit {
  horas=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  minutos=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
  formSubmitted=false;
  mesSeleccionadoInicia=new Date().getMonth()
  diasMesInicio=[];
  diasMesTermina=[];
  yearsAvailable=[];
  maestros:maestro[]=[]
  meses:any[]=[
                {nombre:'enero', numero:0},
                {nombre:'febrero', numero:1},
                {nombre:'marzo', numero:2},
                {nombre:'abril', numero:3},
                {nombre:'mayo', numero:4},
                {nombre:'junio', numero:5},
                {nombre:'julio', numero:6},
                {nombre:'agosto', numero:7},
                {nombre:'septiembre', numero:8},
                {nombre:'octubre', numero:9},
                {nombre:'noviembre', numero:10},
                {nombre:'diciembre', numero:11},


              ]
  now=new Date()

  public crearEventoForm = this.fb.group({
    nombre:['', Validators.required],
    descripcion:['',Validators.required],
    //*Fecha Inicio
    mesInicia:['',Validators.required],
    diaInicia:['',Validators.required],
    //*Hora Inicio
    horaInicia:['',Validators.required],
    minutoInicia:['',Validators.required],
    //*Fecha Termina
    mesTermina:['',Validators.required],
    diaTermina:['',Validators.required],
    //*Hora Termina
    horaTermina:['',Validators.required],
    minutoTermina:['',Validators.required],
    //*Years
    yearInicia:[new Date().getFullYear,Validators.required],
    yearTermina:[new Date().getFullYear,Validators.required],

    realizador:['',Validators.required],
    fechaValida:['']
  },
  {
    validators: this.validarHoras('horaInicia','horaTermina','minutoInicia','minutoTermina','diaInicia','diaTermina', 'mesInicia', 'mesTermina', 'fechaValida')
  }
  )


  constructor(
              private fb: FormBuilder,
              private maestrosService:MaestrosService,
              private router:Router,
              private eventosService:EventosService
    ) {

     }

  ngOnInit(): void {
    this.getYears()
    this.maestrosService.getMaestros()
    .pipe(
      map(maestrosResp=>{
        return maestrosResp.usuarios
      })
    )
    .subscribe(maestros=>{
      this.maestros = maestros
      console.log(this.maestros);
    })
    //*Asignacion de dias habiles mes inicial
    this.crearEventoForm.get('mesInicia').valueChanges
    .subscribe(mesInicia=>{
      console.log(this.crearEventoForm.value);
      this.diasDelMes(this.now.getFullYear(),mesInicia, 'inicia')
    })
    //*Asignacion de dias habiles mes inicial
    this.crearEventoForm.get('mesTermina').valueChanges
    .subscribe(mesTermina=>{
      this.diasDelMes(this.now.getFullYear(),mesTermina, 'termina')
    })
  }

  crearEvento() {

    this.formSubmitted = true;

    if (this.crearEventoForm.invalid) {
      console.log('no valido');
      console.log(this.crearEventoForm.value);
      return;
    }

    const inicio = new Date(

                            this.crearEventoForm.get('yearInicia').value,
                            this.crearEventoForm.get('mesInicia').value,
                            this.crearEventoForm.get('diaInicia').value,
                            this.crearEventoForm.get('horaInicia').value,
                            this.crearEventoForm.get('minutoInicia').value,
                            )
    const final = new Date(

                            this.crearEventoForm.get('yearTermina').value,
                            this.crearEventoForm.get('mesTermina').value,
                            this.crearEventoForm.get('diaTermina').value,
                            this.crearEventoForm.get('horaTermina').value,
                            this.crearEventoForm.get('minutoTermina').value,
                            )

    const data={
      nombre:this.crearEventoForm.get('nombre').value,
      descripcion:this.crearEventoForm.get('descripcion').value,
      realizador:this.crearEventoForm.get('realizador').value,
      horario:{
        empieza:inicio,
        termina:final
      }
    }



    this.eventosService.createEvento(data)
    .subscribe(
      resp=>{


          Swal.fire({
            title:'Evento creado',
            text:`El evento ${resp.evento.nombre} ha sido creado`
          })
            this.router.navigateByUrl(`/dashboard/evento/${resp.evento._id}`)

    })
  }

  campoNoValido(campo:string):boolean{
    if ( this.crearEventoForm.get(campo)?.invalid ) {
      return true;
    } else {
      return false;
    }
  }

  Validarfecha(){
    return(FormGroup:FormGroup)=>{

      const _mesInicia = FormGroup.get('mesInicia')
      const _mesTermina = FormGroup.get('mesTermina')

      if(_mesInicia>_mesTermina){
        _mesInicia.setErrors({mesTerminaMayor:true})
      }

    }



  }

  diasDelMes(year:number, month:number, comodin:'inicia'|'termina'){

      const date = new Date(year, month, 1);


      const dates = [];

      while(date.getMonth() == month) {
        dates.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1);
      }



      switch (comodin) {
        case 'inicia':
         this.diasMesInicio=dates;
         console.log(this.diasMesInicio);
         break;
         case 'termina':
           this.diasMesTermina=dates;
           console.log(this.diasMesTermina);
          break;
      }
    }

    getYears(){

      for (let index = 0; index < 5; index++) {
        this.yearsAvailable.push(new Date().getFullYear()+index)

      }
      console.log(this.yearsAvailable);
    }

    validarHoras(horaInicio: string, horaTermina: string, minInicio:string, minTermina:string, DiaInica:string, DiaTermina:string, mesInicia:string, mesTermina:string, err:string  ) {


      return ( formGroup: FormGroup ) => {

        const iniciaMes = formGroup.get(mesInicia);
        const terminaMes = formGroup.get(mesTermina);

        const inicioDia = formGroup.get(DiaInica);
        const terminaDia = formGroup.get(DiaTermina);

        const inicioHora = formGroup.get(horaInicio);
        const terminaHora = formGroup.get(horaTermina);

        const inicioMin = formGroup.get(minInicio);
        const terminaMin = formGroup.get(minTermina);


        const inicio = new Date(new Date().getFullYear(),iniciaMes.value,inicioDia.value,inicioHora.value,inicioMin.value)
        const final = new Date(new Date().getFullYear(),terminaMes.value,terminaDia.value,terminaHora.value,terminaMin.value)

        // console.log(inicio);
        // console.log(final);


        const errorDisplay = formGroup.get(err);

        const mes = formGroup

        if (inicio > final || inicio===final ) {

            errorDisplay.setErrors({ horaNoValida: true });

          }else{
            errorDisplay.setErrors(null);
        }


      }
    }

}
