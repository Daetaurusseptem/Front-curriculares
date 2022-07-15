import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarImagenPipe } from './mostrar-imagen.pipe';
import { CutNamePipe } from './cut-name.pipe';
import { DigitoIndividualPipe } from './digito-individual.pipe';
import { DesestructurarObjPipe } from './objToArray.pipe';



@NgModule({
  declarations: [MostrarImagenPipe, CutNamePipe, DigitoIndividualPipe, DesestructurarObjPipe],
  imports: [
    CommonModule
  ],
  exports:[
    MostrarImagenPipe,
    CutNamePipe,
    DigitoIndividualPipe,
    DesestructurarObjPipe
  ]
})
export class PipesModule { }
