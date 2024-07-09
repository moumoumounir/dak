import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list-admin',
  templateUrl: './sidenav-list-admin.component.html',
  styleUrls: ['./sidenav-list-admin.component.css']
})
export class SidenavListAdminComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
 
  constructor() { }
  page='test'
  ngOnInit() {
    const rroute = localStorage.getItem('route');
    if ( ( rroute !== null ))   this.page=rroute;
    //this.page='user'
    console.log(' route page ',this.page)
  }
 
  public onSidenavClose = () => {
    this.sidenavClose.emit();
    console.log(' sidenavClose emit  ')
  }


}
