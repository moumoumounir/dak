import { Component, OnInit } from '@angular/core';
  import { EchangeData }  from  '../../_interface/EchangeData'
  import { UsuariosService } from 'src/app/services/usuarios.service'; 
  import { Router } from '@angular/router';
  
  interface CrudData {
    Ref_Object: string;
    Short_Description: string;
    Type:string;
    Parent:string;
    Owner: string;
    Long_Description : string; 
   }
  
   

@Component({
  selector: 'app-data-attributes-list',
  templateUrl: './data-attributes-list.component.html',
  styleUrls: ['./data-attributes-list.component.css']
})
export class DataAttributesListComponent implements OnInit {

  
  

    constructor(private usuariosService: UsuariosService) { }
  
    isSearchShow!: boolean;
    public echangeData : EchangeData ={displayedColumns:[],data:[],
      actionColumns:[],actionButton:{ Button:"action",Column:"subscribed",Label:"Abonner"}
     ,type:'df'}

   
    public displayedColumns = [];
    public action='list'
   
     ngOnInit(): void {
      this.echangeData.displayedColumns=this.displayedColumns;
      this.echangeData.actionColumns=[]
           
      this.getAllOwners();
     localStorage.setItem('route','ListDataAttributes')
          
      
    }
      //public getgetAllOwners(){
        public getAllOwners = () => {
          //this.repoService.getData('api/owner')
          //.subscribe(res => {
         // this.usuariosService.getAllDataObject().subscribe(data => {
         let paramString="sheet=DataAttributes"   
         //this.usuariosService.getDataByCol(paramString).subscribe(data => {
          this.usuariosService.getAllRowsSheet('DataAttributes').subscribe(data => {
        
            
            this.echangeData.data = data;
            console.log(' all users '+JSON.stringify(data))
           })
           
    }
  

  
    actionHandler1(event:any){
      console.log(this.action,' actionHandler1 ', event)
   
    }
  
  
  
  }
  
