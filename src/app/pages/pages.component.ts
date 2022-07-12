import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
  menuItems:any[]=[]
  constructor(private sideBarService:SidebarService) { }

  ngOnInit(): void {
    this.menuItems=this.sideBarService.menu
  }

}
