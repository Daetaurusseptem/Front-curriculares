import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { CrearMaestroComponent } from './mantenimientos/crear-maestro/crear-maestro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaestrosComponent } from './mantenimientos/maestros/maestros.component';
import { MateriasMaestroComponent } from './maestro-herramientas/materias-maestro/materias-maestro.component';
import { MateriasComponent } from './mantenimientos/materias/materias.component';
import { MateriaComponent } from './mantenimientos/materias/materia.component';
import { MaestroComponent } from './mantenimientos/maestros/maestro.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { PipesModule } from '../pipes/pipes.module';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { CrearMateriaComponent } from './mantenimientos/crear-materia/crear-materia.component';
import { ComponentsModule } from '../components/components.module';
import { HorarioComponent } from './mantenimientos/horario/horario.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    PagesComponent,
    NoPageFoundComponent,
    UsuariosComponent,
    CrearMaestroComponent,
    MaestrosComponent,
    MateriasMaestroComponent,
    MateriasComponent,
    MateriaComponent,
    MaestroComponent,
    DashboardAdminComponent,
    UsuarioComponent,
    CrearMateriaComponent,
    HorarioComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ComponentsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    MatFormFieldModule,
    MatInputModule
    
  ]
})
export class PagesModule { }
