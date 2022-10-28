import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { CrearMaestroComponent } from './mantenimientos/crear-maestro/crear-maestro.component';
import { MaestrosComponent } from './mantenimientos/maestros/maestros.component';
import { MaestroComponent } from './mantenimientos/maestros/maestro.component';
import { MateriasMaestroComponent } from './maestro-herramientas/materias-maestro/materias-maestro.component';
import { MateriasComponent } from './mantenimientos/materias/materias.component';
import { CrearMateriaComponent } from './mantenimientos/crear-materia/crear-materia.component';
import { MateriaComponent } from './mantenimientos/materias/materia.component';
import { HorarioComponent } from './mantenimientos/horario/horario.component';
import { EventosComponent } from './mantenimientos/eventos/eventos.component';
import { EventoComponent } from './mantenimientos/eventos/evento.component';
import { CrearEventoComponent } from './mantenimientos/crear-evento/crear-evento.component';
import { EventoDetailsComponent } from './dashboard-admin/evento-details/evento-details.component';
import { AdminGuard } from '../guards/admin.guard';
import { MateriaMaestroComponent } from './maestro-herramientas/materias-maestro/materia-maestro/materia-maestro.component';
import { ListaAlumnosComponent } from './maestro-herramientas/lista-alumnos/lista-alumnos.component';
import { ListaAsistenciasComponent } from './maestro-herramientas/lista-asistencias/lista-asistencias.component';
import { PerfilAlumnoComponent } from './alumno-herramientas/perfil-alumno/perfil-alumno.component';
import { AlumnoInformacionComponent } from './maestro-herramientas/alumno-informacion/alumno-informacion.component';

const childRoutes:Routes=[
            { path: '', component: DashboardAdminComponent, data:{title: 'Dashboard'}},
            //*Mantenimientos solo administradores
            { path: 'alumnos',canActivate:[AdminGuard], component: UsuariosComponent },
            { path: 'alumno/:id', component: UsuarioComponent },
            { path:'crear-maestro',canActivate:[AdminGuard], component:CrearMaestroComponent},
            { path: 'maestros',canActivate:[AdminGuard], component: MaestrosComponent },
            { path: 'maestro/:id',canActivate:[AdminGuard], component: MaestroComponent },
            { path:'materias-maestros',canActivate:[AdminGuard], component:MateriasMaestroComponent},
            { path:'materias',canActivate:[AdminGuard], component:MateriasComponent},
            { path:'materias/crear-materia',canActivate:[AdminGuard], component:CrearMateriaComponent},
            { path:'materia/:id',canActivate:[AdminGuard], component:MateriaComponent},
            { path:'horarios/:id',canActivate:[AdminGuard], component:HorarioComponent},
            { path:'eventos',canActivate:[AdminGuard], component:EventosComponent},
            { path:'evento/:id',canActivate:[AdminGuard], component:EventoComponent},
            { path:'crear-evento', canActivate:[AdminGuard],component:CrearEventoComponent},
            //*Instructores
            { path:'materias-maestro', component:MateriasMaestroComponent},
            { path:'materias-maestro/:id', component:MateriaMaestroComponent},
            { path:'lista-materia/:id', component:ListaAlumnosComponent},
            { path:'lista-materia/:idMateria/:idAlumno', component:AlumnoInformacionComponent},
            { path:'lista-asistencias/:id', component:ListaAsistenciasComponent},
            { path:'ver-evento/:id', component:EventoDetailsComponent},
            { path:'ver-evento/:id', component:EventoDetailsComponent},

            //*Alumnos
            {path:'perfil-alumno', component:PerfilAlumnoComponent}

          ]

@NgModule({
  imports:[RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class ChildRoutesModule { }


