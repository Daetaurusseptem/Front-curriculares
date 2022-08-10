import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarImagenPipe } from './mostrar-imagen.pipe';
import { CutNamePipe } from './cut-name.pipe';
import { DigitoIndividualPipe } from './digito-individual.pipe';
import { DesestructurarObjPipe } from './objToArray.pipe';
import { MostrarFechaPipe } from './mostrar-fecha.pipe';
import { MostrarHorasPipe } from './mostrar-horas.pipe';
import { StringifyPipe } from './stringify.pipe';
import { VerMesPipe } from './ver-mes.pipe';
import { VerCicloPipe } from './ver-ciclo.pipe';
import { GenerarfechaPipe } from './generarfecha.pipe';



@NgModule({
  declarations: [MostrarImagenPipe, CutNamePipe, DigitoIndividualPipe, DesestructurarObjPipe, MostrarFechaPipe, MostrarHorasPipe, StringifyPipe, VerMesPipe, VerCicloPipe, GenerarfechaPipe],
  imports: [
    CommonModule
  ],
  exports:[
    MostrarImagenPipe,
    CutNamePipe,
    DigitoIndividualPipe,
    DesestructurarObjPipe,
    MostrarFechaPipe,
    MostrarHorasPipe,
    StringifyPipe,
    VerMesPipe,
    VerCicloPipe
  ]
})
export class PipesModule { }
