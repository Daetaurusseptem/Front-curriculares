import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PagesModule } from '../pages/pages.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    SideBarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule
  ],
  exports:[
    SideBarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
