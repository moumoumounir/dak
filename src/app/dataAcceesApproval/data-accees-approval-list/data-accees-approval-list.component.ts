import { Component, OnInit ,
  ViewChild} from '@angular/core';
import { EchangeData }  from  '../../_interface/EchangeData'
import { UsuariosService } from 'src/app/services/usuarios.service'; 
import { Router } from '@angular/router';

import { NavbarUserComponent } from 'src/app/components/navbar-user/navbar-user.component';

interface CrudData {
  Ref    : string,       
  Ref_Request: string,
  User: string,
  Request_Date: string,
  Approval_Date: string,
  Status: string,
  Approval_Text: string
}

@Component({
  selector: 'app-data-accees-approval-list',
  templateUrl: './data-accees-approval-list.component.html',
  styleUrls: ['./data-accees-approval-list.component.css']
})



export class DataAcceesApprovalListComponent implements OnInit {

  myDate: Date = new Date();
  public sysdate=''
  constructor(private usuariosService: UsuariosService) { 


    this.sysdate = ('0' + this.myDate.getDate()).slice(-2)  + '/' + (('0' + (this.myDate.getMonth()+1)).slice(-2)) + '/' + this.myDate.getFullYear()  ;  
  
   
  }

  @ViewChild(NavbarUserComponent, { static: false }) childC!: NavbarUserComponent;
 

  isSearchShow!: boolean;
  public crudData!:CrudData;
  public echangeData : EchangeData ={displayedColumns:[],data:[],
    actionColumns:[],actionButton:{ Button:"action",Column:"Type",Label:"Approve"}
   ,type:'df'}
  public displayedColumns = [	'Ref_Request', 	'Ref_Object', 	'Responsible', 	'Status', 	'Request_Date' ];
  public action='list'
   ngOnInit(): void {
    
    this.echangeData.displayedColumns=this.displayedColumns;
    this.echangeData.actionColumns=[ 'details', 'action','select']
    this.getAllOwners();
   localStorage.setItem('route','ListApproval')
        
    
  }
    //public getgetAllOwners(){
      public getAllOwners = () => {
        //this.repoService.getData('api/owner')
        //.subscribe(res => {
        console.log(' getUserRequestValidation before ')
        
        //this.usuariosService.getUserRequestValidation().subscribe(data => {
        this.usuariosService.getAllRowsSheet('userRequestValidation').subscribe(data => {
        
          
          this.echangeData.data = data.filter((el:any) => el['Status']=='Waiting' ) ; //&& el['Responsible']==localStorage.getItem('user') );
          console.log(' getUserRequestValidation '+JSON.stringify(data))
         })
         
  }
  crudActionHandler(event:any){

    this.childC.ngAfterViewInit()
      this.ngOnInit()
    this.action='list'
  }
  actionHandler1(event:any){
  console.log(' actionHandler1 ', event)
  let action=event['action']
  let data = event['data']
  if ( action =='action' || action=='selectAction'){
  console.log(' call update ',data)
  data[0]['Status']='Approve'
  let myDate: Date = new Date();

  let today = ('0' + myDate.getDate()).slice(-2)  + '/' + (('0' + (myDate.getMonth()+1)).slice(-2)) + '/' + myDate.getFullYear()  ;  

  data[0]['Approval_Date']=today
  //let resultat = await this.update(data[0])
 // this.usuariosService.updateUserRequestValidation(data[0]).subscribe(resultat => {
    this.usuariosService.updateJsonDataToSheetyKey({"action":"updateJsonDataToSheetyKey","key":"Ref","data":data[0],"sheet":"userRequestValidation"}).subscribe(resultat => {     
             
    //this.echangeData.data = resultat.filter(el => el['Status']=='Waiting');
    location.reload();
    console.log(' update  '+JSON.stringify(resultat))
   })
   this.action="list"

  }if ( action =='details' || action=='update'){
  console.log('actionHandler1 Action ',action,'  data',JSON.stringify(data))
  this.crudData=data[0]
  this.action=action
  }

  }

}
