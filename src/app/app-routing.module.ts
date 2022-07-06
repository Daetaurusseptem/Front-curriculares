import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', component: PagesComponent },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
