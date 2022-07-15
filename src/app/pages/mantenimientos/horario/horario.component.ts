import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Horario } from 'src/app/interfaces/horario.interface';
import { materias } from 'src/app/interfaces/materiasSimple.interface';
import { HorariosService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  horarios:Horario[]
  horarioMostrar:Horario[];
  public formSubmitted = false;
  diaSeleccionado:'lunes'|'martes'|'miercoles'|'jueves'|'viernes'='lunes';
  horas=[7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  minutos=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
  idMateria=''
  horariosForm = this.fb.group({
    horaInicio:['',[Validators.required]],
    minutoInicio:['',[Validators.required]],
    horaTermina:['',[Validators.required]],
    minutoTermina:['',[Validators.required]]
  },
  {
    validators: this.validarHoras('horaInicio','horaTermina','minutoInicio','minutoTermina')
  }
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private horarioService:HorariosService
  ) {

      this.horariosForm.get('horaInicio').valueChanges
        .subscribe(administradorId => {
          console.log(this.horariosForm.value);
        })
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params);
      this.idMateria = params['id']
      this.getHorarios()
    })
  }

  changeDay(dia:'lunes'|'martes'|'miercoles'|'jueves'|'viernes'='lunes'){
    console.log(this.horariosForm.value);
    this.diaSeleccionado = dia;
    console.log(this.diaSeleccionado);
    this.horariosForm.get('horaInicio').setValue('')
    this.horariosForm.get('minutoInicio').setValue('')
    this.horariosForm.get('horaTermina').setValue('')
    this.horariosForm.get('minutoTermina').setValue('')
    this.getHorarios()
    this.getHorarioByDia(dia);
  }

  guardarHorarioDia(){
    console.log(this.horariosForm);
    const data ={ 
      horaInicio:this.horariosForm.get('horaInicio').value,
      minutoInicio:this.horariosForm.get('minutoInicio').value,
      horaTermina:this.horariosForm.get('horaTermina').value,
      minutoTermina:this.horariosForm.get('horaInicio').value,
    }
    this.horarioService.crearHorario(this.idMateria,this.diaSeleccionado,data)
    .subscribe(horario=>{
      console.log(horario);
      this.changeDay(this.diaSeleccionado)
    })
  }

  validarHoras(horaInicio: string, horaTermina: string, minInicio:string, minTermina:string ) {
    
    
    return ( formGroup: FormGroup ) => {

      const Inicio = formGroup.get(horaInicio);
      const Termina = formGroup.get(horaTermina);
      const InicioMin = formGroup.get(minInicio);
      const TerminaMin = formGroup.get(horaTermina);
      

      
      if ( Inicio.value <= Termina.value) { 
        Termina.setErrors(null);
      }else{
        Termina.setErrors({ horaNoValida: true });
      }
      

    }
  }
  campoNoValido( campo: string ): boolean {

    if ( this.horariosForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  getHorarios(){
    this.horarioService.getHorarios(this.idMateria)
    .pipe(
      map(item=>{
        console.log(item);
        return item[0]
      })
    )
    .subscribe((r:any)=>{
      this.horarios= r.horarios
    })
  }

  getHorarioByDia(dia:'lunes'|'martes'|'miercoles'|'jueves'|'viernes'='lunes'){
    this.horarioMostrar = this.horarios.filter(horario=>horario.dia===dia)
    return this.horarioMostrar;
  }
}
