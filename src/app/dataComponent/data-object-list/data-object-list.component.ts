import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EchangeData }  from  '../../_interface/EchangeData'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DbObject } from '../../_interface/DbObject';
import { MainService } from 'src/app/services/main.service';
import { NavbarUserComponent } from 'src/app/components/navbar-user/navbar-user.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-object-list',
  templateUrl: './data-object-list.component.html',
  styleUrls: ['./data-object-list.component.css']
})

export class DataObjectListComponent implements OnInit {

  constructor(private httpClient :HttpClient,
    private mainService: MainService,
    private crudService : CrudService,
    private activeRoute: ActivatedRoute) { }

  //isSearchShow: boolean;
  public echangeData : EchangeData ={
      displayedColumns:[],data:[],
      actionColumns:[],
      actionButton:{ Button:"action",Column:"subscribed",Label:"Abonner"}
   ,type:'df'}

   @ViewChild(NavbarUserComponent, { static: false }) childC!: NavbarUserComponent;
 


  public crudData !:DbObject;

  public displayedColumns = [	'Ref_Object', 	'Short_Description'];
  public action='list'
  public spinerSelectedField=false;
  
  public dataConf : any={};
    
  public form : any={};
  public title="";

  public getJson(): Promise<any>{
     
    console.log(' json  getJson ')  
    return this.httpClient.get("assets/dbObjectForm.json").toPromise()
 }
  async  ngOnInit() {
    console.log('route ',this.activeRoute.snapshot.routeConfig!.path)
 
    let activePath:any=this.activeRoute.snapshot.routeConfig
    if ( activePath !== undefined )   localStorage.setItem('route',activePath['path'])
     this.dataConf = await this.getJson()
    
    console.log('form  ',this.form)
    this.title=this.dataConf['titleList']
    this.echangeData.actionColumns=this.dataConf['actionColumns']
 

    this.echangeData.displayedColumns=this.dataConf['displayedColumns'];

    //this.echangeData.displayedColumns=this.displayedColumns;
    //this.echangeData.actionColumns=['Select', 'details', 'action', 'delete','Add']
   
    this.getAllDataObjects();
    console.log(' getAllDataObjec before brfore  ',this.activeRoute.snapshot.params['req'])
 
 // localStorage.setItem('route','ListDataObject')
}
 
   
public getAllDataObjects = () => {
  let data:any={"sheet":"dataObject","action":"mergeObjectWithRequestUserByKeyToSubscribed",
  "data":{"joinedSheetName":"userRequest", "mergeKey":"Ref_Object",  "filtredFieldValue" : {"User":localStorage.getItem('user') } } }
 
     
         if ( this.activeRoute.snapshot.params['req'] != undefined ){
          let req=this.activeRoute.snapshot.params['req'];
           data.data.filtredFieldValue['Ref_Object']=req;
         }
         this.mainService.getObjectMergedRequest(data).subscribe(data => {   
          this.action ='list'    
          this.echangeData.data = data;

       

         if ( this.activeRoute.snapshot.params['req'] != undefined ){
          let event:any={};
            event['action']='details'
            event['data']=[]//.push(ddata[0])
            event['data'].push(data[0])
             this.actionHandler1(event) 
         }
           })
      }


  public deleteRowSheet(id:string,sheet:string): Promise<any>{
    // let paramString1='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestValidation'
          
     return this.crudService.deleteRowSheet(id,sheet).toPromise()
  }
  

  async actionHandler1(event:any){
  this.action=event['action'] 
  let data = event['data'][0];
  console.log('action ',this.action,' actionHandler1 event ', event)
  if ( this.action == 'delete'){
    if (window.confirm('Are sure you want to delete this row ?'))  {
      this.spinerSelectedField=true
    const resp=await this.deleteRowSheet(data['dataObject_id'],'dataObject')
      
    this.ngOnInit()
    this.spinerSelectedField=false
    
    }
    
  }else {
  
  if ( this.action == 'action'){
  }
  if ( this.action == 'details'){
    console.log(this.action,' actionHandler1 ', event)

   // console.log('findObjectDetailsByRef ',this.findObjectDetailsByRef(data['Ref_Object']))
   // console.log(' avant actionHandler1  crud data ', this.crudData)

    }
    if ( this.action == 'add'){
      console.log(this.action,' actionHandler1 ', event)
  
     // console.log('findObjectDetailsByRef ',this.findObjectDetailsByRef(data['Ref_Object']))
     // console.log(' avant actionHandler1  crud data ', this.crudData)
  
      }
  
  this.crudData=data
  console.log(' actionHandler1  crud data ', this.crudData)
    }
  }

reloadData(event:any){  
  this.childC.ngAfterViewInit();
    this.action='list' 
    this.ngOnInit()
 

}

}
