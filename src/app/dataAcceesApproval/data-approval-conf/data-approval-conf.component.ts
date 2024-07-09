import { Component, OnInit } from '@angular/core';
import { EchangeData }  from  '../../_interface/EchangeData'
import { UsuariosService } from 'src/app/services/usuarios.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-approval-conf',
  templateUrl: './data-approval-conf.component.html',
  styleUrls: ['./data-approval-conf.component.css']
})

export class DataApprovalConfComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  isSearchShow!: boolean;
  public echangeData : EchangeData ={displayedColumns:[],data:[],actionColumns:[],actionButton:{},type:'df'}
 
  public displayedColumns = [];
 
   ngOnInit(): void {
    this.echangeData.displayedColumns=this.displayedColumns;
    this.echangeData.actionColumns=[ 'details', 'update', 'delete']
    this.getAllOwners();
   localStorage.setItem('route','ListDataConfApproval')
        
    
  }
    //public getgetAllOwners(){
      public getAllOwners = () => {
        //this.repoService.getData('api/owner')
        //.subscribe(res => {
        //this.usuariosService.getDataAcceesApproval().subscribe(data => {
        
        this.usuariosService.getAllRowsSheet('DataAcceesApproval').subscribe(data => {
        
          this.echangeData.data = data;
          console.log(' all users '+JSON.stringify(data))
         })
         
    }

  actionHandler1(event:any){
  console.log(' actionHandler1 ', event)

  }

}


