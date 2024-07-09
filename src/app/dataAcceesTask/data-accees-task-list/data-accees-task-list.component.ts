import { Component, OnInit } from '@angular/core';
import { EchangeData }  from  '../../_interface/EchangeData'
import { UsuariosService } from 'src/app/services/usuarios.service'; 
import { MainService } from 'src/app/services/main.service';
import { DbObjectAccessTask } from 'src/app/_interface/DbObjectAccessTask';
import { Router } from '@angular/router';



@Component({
  selector: 'app-data-accees-task-list',
  templateUrl: './data-accees-task-list.component.html',
  styleUrls: ['./data-accees-task-list.component.css']
})
export class DataAcceesTaskListComponent implements OnInit {
 
  
   
    myDate: Date = new Date();
    public sysdate=''
    constructor(private usuariosService: UsuariosService,
      private mainService :MainService) { 
  
  
      this.sysdate = ('0' + this.myDate.getDate()).slice(-2)  + '/' + (('0' + (this.myDate.getMonth()+1)).slice(-2)) + '/' + this.myDate.getFullYear()  ;  
    
     
    }
    public spinerSelectedField=false
    isSearchShow!: boolean;
    public crudData!:DbObjectAccessTask;
    public echangeData : EchangeData ={displayedColumns:[],data:[],
      actionColumns:[],actionButton:{ Button:"action",Column:"Type",Label:"Done"}
     ,type:'df'}
    public displayedColumns = [	'Ref_Request', 	'Ref_Object', 	'Responsible_Group', 	'Status', 	'Request_Date' ];
    public action='list'
     ngOnInit(): void {
      
      this.echangeData.displayedColumns=this.displayedColumns;
      this.echangeData.actionColumns=[ 'details', 'action','select']
      this.getAllOwners();
     localStorage.setItem('route','ListTask')
          
      
    }
      //public getgetAllOwners(){
        public getAllOwners = () => {
          //this.repoService.getData('api/owner')
          //.subscribe(res => {
          console.log(' getUserRequestValidation before ')
          let paramString="colName=Responsible_Group&colValue="+localStorage.getItem('Groupe')+"&sheet=userRequestTask"
          let o={'Responsible_Group':localStorage.getItem('Groupe'),'Status':["Open","In Progress","To Do","Requested"]}//['To Do','Waiting']}
          
          this.usuariosService.getDataByCols('userRequestTask',o).subscribe(data => {
         
          //this.usuariosService.getDataByCol(paramString).subscribe(data => {
            
            this.echangeData.data = data//.filter(el => el['Status']=='Waiting' && el['User']==localStorage.getItem('user') );
            console.log(' getUserRequestValidation '+JSON.stringify(data))
           })
           
      
    
    }
   
    crudActionHandler(event:any){
         location.reload();
     // this.action='list'
    }
    async actionHandler1(event:any){
    console.log(' actionHandler1 ', event)
    let action=event['action']
    let data = event['data']
    data[0]['Task_Date']=this.sysdate
    if ( action =='action' || action=='selectAction'){
    
    for (var  el in data ){
    console.log(' call update ',data[el])
    data[el]['Status']='Done'
    let myDate: Date = new Date();
  
    let today = ('0' + myDate.getDate()).slice(-2)  + '/' + (('0' + (myDate.getMonth()+1)).slice(-2)) + '/' + myDate.getFullYear()  ;  
  
    data[el]['Task_Date']=today
   this.spinerSelectedField=true
      let responseData = await this.updateUserRequestTask(data[el])
    this.spinerSelectedField=false
    //let resultat = await this.update(data[0])
    //this.usuariosService.updateUserRequestValidation(data[0]).subscribe(resultat => {
  /*  this.usuariosService.updateJsonDataToSheetyKey({"action":"updateJsonDataToSheetyKey","key":"Ref","data":data[el],"sheet":"userRequestValidation"}).subscribe(resultat => {     
           
     
      console.log(' update  '+JSON.stringify(resultat))
     })*/
    }
     location.reload();
     this.action="list"
  
    }if ( action =='details' || action=='update'){
    console.log('actionHandler1 Action ',action,'  data',JSON.stringify(data))
    this.crudData=data[0]
    this.action=action
    }
  
    }

    
    public updateUserRequestTask(data:any): Promise<any>{
      // let paramString1='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestValidation'
          console.log(' crudActionHandler ',data)
      
          let crudData1:any={}
          crudData1['Status']=data['Status']
          crudData1['Task_Text']=data['Task_Text']
          console.log(' crudActionHandler data updated ',crudData1)
          crudData1['Ref_Object']=data['Ref_Object']
          crudData1['Responsible_Group']=data['Responsible_Group']
          crudData1['Ref']=data['Ref']
          crudData1['Ref_Request']=data['Ref_Request']
          crudData1['Request_Date']=data['Request_Date']
          //crudData1.User=data['User']['value']
          //this.usuariosService.updateUserRequestValidation(this.crudData).subscribe(resultat => {
         return  this.mainService.updateUserRequestTask({"action":"updateUserRequestTask","data":crudData1,"sheet":"userRequestTask"}).toPromise()
          
        
      //return this.crudService.updateJsonDataToSheet(data,'dataObject').toPromise()
      } 

    public updateUserRequestValidation(dataForm:any): Promise<any>{
      let data = dataForm ;//this.buildOjectFromDataForm(dataForm)

      console.log(' crudActionHandler data updated task ',data)
      let formData :{ data:{},key:string,sheet:string,action:string}=
                                                      {"action":"updateJsonDataToSheetyKey",
                                                        data:data,
                                                        key:'Ref',
                                                        sheet:'userRequestTask'
                                                      }
      return this.usuariosService.updateJsonDataToSheetyKey(formData).toPromise()
    }
    

  
  }
  