import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FlexLayoutModule } from '@angular/flex-layout';
 

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit, AfterViewInit  {
  notif :number=0;
  request:number=0;
  task:number=0;
  changeText : boolean=true;
  page :string='';
  mail :string=''
  user :string=''
  constructor(private router: Router,
    private usuariosService:UsuariosService) { }

  @Output() public sidenavToggle = new EventEmitter();
  
  btnColourAccueil='white'
  btnColourDataUser='white'
  btnColourComplainUser='white'
  btnColourRapportUser='white'
  
  //public onToggleSidenav = () => {
  public onToggleSidenav (){
    this.sidenavToggle.emit();
    console.log(' onToggleSidenav emit ')
  }
  initColor(){

    this.btnColourAccueil='primary'
    this.btnColourDataUser='primary'
    this.btnColourComplainUser='primary'
    this.btnColourRapportUser='primary'

  }

  ngOnInit(): void {
   // this.notif=0;
    const rroute =localStorage.getItem('route');
    const mmail =localStorage.getItem('mail');
    const uuser =localStorage.getItem('user');
    if ( rroute !== null)   this.page = rroute;
    if ( mmail !== null)   this.mail = mmail;
    
    if ( uuser !== null)    this.user=uuser;
    console.log('nofi '+this.notif)
    console.log('this.page '+this.page)
    //let paramString="sheet=userRequest"
    
   
  }


  async ngAfterViewInit() {
    let paramObject:any={}
    let o:any={'User':this.user}
    paramObject['data']=o
    paramObject['sheet']='userRequest'
   
  //await this.usuariosService.getDataByCols(paramObject).subscribe(
  await this.usuariosService.getDataByCols('userRequest',o).subscribe(
      data1 =>{
    
        //this.request=Object.keys(data1).length
        this.request=data1.length
        console.log(this.request,' nav request  ',JSON.stringify(data1))
      }
      );
      let paramString2='colName=Responsible&colValue='+this.user+'&sheet=userRequestValidation'
      let o1:any={'Responsible':this.user}
      o1['Status']='Waiting'
    paramObject['data']=o1
    paramObject['sheet']='userRequestValidation'
      await this.usuariosService.getDataByCols('userRequestValidation',o1).subscribe(
       data2 =>{
   
        //this.notif=Object.keys(data2).length
         this.notif=data2.length
         console.log(this.notif,' nav notof ',JSON.stringify(data2))
       }
       );

       let o3={'Responsible_Group':localStorage.getItem('Groupe'),'Status':["Open","In Progress","To Do","Requested"]}
       console.log(' nav task ',JSON.stringify(o3))
          
       await this.usuariosService.getDataByCols('userRequestTask',o3).subscribe(
        data2 =>{
    
         //this.notif=Object.keys(data2).length
          this.task=data2.length
          console.log(this.task,' nav task ',JSON.stringify(data2))
        }
        );

  }
  getMoreInformation(): string {
    return 'Address : Home \n  Tel : Number';
    }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }
}