import {  ElementRef , Renderer2,Component, AfterViewInit, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EchangeData }  from  '../../_interface/EchangeData'
import { UsuariosService } from 'src/app/services/usuarios.service'; 


@Component({
  selector: 'app-user-mat-list',
  templateUrl: './user-mat-list.component.html',
  styleUrls: ['./user-mat-list.component.css']
})
export class UserMatListComponent implements OnInit {
  
  Description : any;
  existImage :boolean=true;
  image:string="";
  text_top:string=""
  text_bottom:string=""
  datalength=0

  constructor( 
    @Inject(MAT_DIALOG_DATA) data:any,private elRef : ElementRef ,private render : Renderer2 ,
  private usuariosService: UsuariosService,
  public dialogRef : MatDialogRef<UserMatListComponent>
  ) { 
    this.Description = data
    
  }
  public echangeData : EchangeData ={displayedColumns:[],data:[],actionColumns:[],actionButton:{}, type:'df'}
 
  async ngOnInit(){


    this.echangeData.displayedColumns=this.Description['displayedColumns'];
    this.echangeData.actionColumns=this.Description['actionColumns']
    this.echangeData.data=this.Description['data']
    console.log('description ',JSON.stringify(this.Description))

    console.log('echangeData ',JSON.stringify(this.echangeData))


      
   }
  public spinerSelectedField=false;
        public action='list'

         actionHandler1(event:any){

          console.log(' action handler event ',JSON.stringify(event))
          this.dialogRef.close({data:JSON.stringify(event)});
        }



}
