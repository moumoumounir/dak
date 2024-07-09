import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EchangeData }  from  '../../_interface/EchangeData'
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MainService } from 'src/app/services/main.service';
import { NavbarUserComponent } from 'src/app/components/navbar-user/navbar-user.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})


export class attributeListComponent implements OnInit {

  constructor(
    private httpClient:HttpClient,
    private mainService: MainService,
    private crudService : CrudService,
    private activeRoute: ActivatedRoute) { }

  //isSearchShow: boolean;
  public echangeData : EchangeData ={
      displayedColumns:[],data:[],
      actionColumns:[],
      actionButton:{}
   ,type:'df'}

   @ViewChild(NavbarUserComponent, { static: false }) childC!: NavbarUserComponent;
 


  public crudData :any;

  public displayedColumns = [];
  public action='list'
  public spinerSelectedField=false;
    
  public dataConf : any={};
    
  public title="";

  public getJson(): Promise<any>{
     
    console.log(' json  getJson ')  
    return this.httpClient.get("assets/dbAttributesForm.json").toPromise()
 }
  async  ngOnInit() {
    console.log('route ',this.activeRoute.snapshot.routeConfig!.path)
    let activePath:any=this.activeRoute.snapshot.routeConfig
    if ( activePath !== undefined )   localStorage.setItem('route',activePath['path'])
  
    this.dataConf = await this.getJson()
    
  
    this.title=this.dataConf['titleList']
    this.echangeData.actionColumns=this.dataConf['actionColumns']
 

    this.echangeData.displayedColumns=this.dataConf['displayedColumns'];

    
   
    this.getAllObjects();
    console.log(' getAllDataObjec before brfore  ',this.activeRoute.snapshot.params['req'])

}
 
   
public getAllObjects = () => {

  let o:any={}
  //{'User':localStorage.getItem('user')}
  let sheet='DataAttributes'
  
    if ( this.activeRoute.snapshot.params['req'] != undefined ){
    let req=this.activeRoute.snapshot.params['req'];
     o['params_id']=req;
   }
   this.mainService.getDataByCols(sheet,o).subscribe(data => {
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
         
     return this.crudService.deleteRowSheet(id,sheet).toPromise()
  }
  

  async actionHandler1(event:any){
  this.action=event['action'] 
  let data = event['data'][0];
  console.log('action ',this.action,' actionHandler1 event ', event)
  if ( this.action == 'delete'){
    if (window.confirm('Are sure you want to delete this row ?'))  {
      this.spinerSelectedField=true
    const resp=await this.deleteRowSheet(data['DataAttributes_id'],'DataAttributes')
      
    this.ngOnInit()
    this.spinerSelectedField=false
    
    }
    
  }else {
    
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
