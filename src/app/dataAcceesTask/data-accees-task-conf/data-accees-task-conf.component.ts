import { Component, OnInit } from '@angular/core';
  import { EchangeData }  from  '../../_interface/EchangeData'
  import { UsuariosService } from 'src/app/services/usuarios.service'; 
  import { Router } from '@angular/router';
   
  

@Component({
  selector: 'app-data-accees-task-conf',
  templateUrl: './data-accees-task-conf.component.html',
  styleUrls: ['./data-accees-task-conf.component.css']
})
export class DataAcceesTaskConfComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }
  
    isSearchShow!: boolean;
    public echangeData : EchangeData ={displayedColumns:[],data:[],actionColumns:[],actionButton:{},type:'df'}
   
    public displayedColumns = [];
   
     ngOnInit(): void {
      this.echangeData.displayedColumns=this.displayedColumns;
      this.echangeData.actionColumns=[ 'details', 'update', 'delete']
      this.getAllOwners();
     localStorage.setItem('route','ListDataConfTask')
          
      
    }
      //public getgetAllOwners(){
        public getAllOwners = () => {
          //this.repoService.getData('api/owner')
          //.subscribe(res => {
          let paramString="sheet=DataAcceesTask" 
          let o={}
          //this.usuariosService.getDataByCol(paramString).subscribe(data => {
          this.usuariosService.getDataByCols('DataAcceesTask',o).subscribe(data => {
           
            this.echangeData.data = data;
            console.log(' all users '+JSON.stringify(data))
           })
           
      
      
    
    }
  
    actionHandler1(event:any){
    console.log(' actionHandler1 ', event)
  
    }
  
  }
  
  
  
