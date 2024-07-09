
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormArray,
  SelectControlValueAccessor
} from '@angular/forms';
import { cloneDeep } from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HelpComponent } from 'src/app/help/help.component'
import { EchangeData  } from 'src/app/_interface/EchangeData';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CrudService } from 'src/app/services/crud.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})


export class UserCrudComponent implements OnInit {

public listData : EchangeData ={displayedColumns:[],data:[],actionColumns:[],actionButton:{},type:'df'}
   
    public displayedColumns = [];
    
  
     myFormGroup: FormGroup;
     selectedDate: Date = new Date();
     FilterColumnType =false;
    group :any= {};
    formInput: any[]=[];
    formInputLoop: any[]=[];
    formInputLoop1: any[]=[];
    formInputLoop2: any[]=[];
    //title: String;
    filename : String="";
    uploadFilePath!:File;
    csv:string="";
    UploadDirectory="";
    submitLabel="validate"
    csvFolder:string[]= [] ;//| null = null;
    public multipleSelectedValue:string[]=[]; 
    
    startDate = new FormControl(new Date());
    endDate = new FormControl(new Date());
    public spinerSelectedField=false
  
    constructor(public matDialog: MatDialog, //private localStorageService: LocalstorageService, 
      private usuariosService :UsuariosService, 
      private crudService : CrudService,
      private formBuilder: FormBuilder,
      private httpClient:HttpClient) {
  
      this.myFormGroup = new FormGroup(this.group);
      
    }
    //cronstrue1=""
    dataForm:any[]=[]
     currentAction: string="";
    //addFilterButton:Boolean=false;
    data:any={}
    //@Input() message: [];
    @Input() echangeData: any ;
  
    @Output() countChanged: EventEmitter<any> =   new EventEmitter();
    
    public dataConf : any={};
  
    public form : any={};
    public formTitle:string="";
  
    public getJson(): Promise<any>{
      // let paramString1='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestValidation'
      console.log(' json  getJson ')  
      return this.httpClient.get("assets/dbUserForm.json").toPromise()
   }
    async  ngOnInit() {
      this.dataConf = await this.getJson()
      this.form=this.dataConf['form']
      this.formTitle=this.dataConf['TitleFormObject']
      console.log(this.formTitle,' this.dataConf  ',this.dataConf)  
      this.listData.displayedColumns=[] //this.displayedColumns;
      this.listData.actionColumns=[]
           
      console.log(' this.echangeData  ',this.echangeData)  
      if ( this.echangeData != undefined ){
		let o:any={"User":localStorage.getItem("user")}
		let sheet:string='user'
       this.usuariosService.getDataByCols(sheet,o).subscribe(
        data =>{
          this.listData.data = data;
         }
      )}else  {
        this.listData.data = []; 
        this.echangeData=[]
      }
  
      
      this.group = {};
      this.formInput=[];
      this.formInputLoop=[];
      this.myFormGroup = new FormGroup(this.group);
      let myDate: Date = new Date();
  
       let today = myDate.getFullYear() + '-' + (('0' + (myDate.getMonth()+1)).slice(-2)) + '-' + ('0' + myDate.getDate()).slice(-2) ;  
  
        if (this.echangeData.length > 0){
        this.data ={action:'action',id:5,type:'type',currentModule:'module321',droppedModules:[],
        form: this.form    }
        }else 
        {
          this.data ={action:'action',id:5,type:'type',currentModule:'module321',droppedModules:[],
          form: this.form  }
        }
     
       let dataSize = Object.keys(this.data).length;
   
      this.formInput = []
      //this.submitLabel='Close'
        if (!(typeof this.data['form'] === 'undefined')) {
          const dataFormClone = cloneDeep(this.data['form']);
    
          this.dataForm = dataFormClone
          this.formInput = Object.values(dataFormClone);
  
   
          for (var i in this.formInput) {
          
           
            if (this.formInput[i]['hide'] != 1) {
              this.formInputLoop.push(this.formInput[i])
              this.group[this.formInput[i]['label']] = new FormControl('')
              
             if (this.formInput[i]['required'] == 1){
                  this.myFormGroup.controls[this.formInput[i]['label']].setValidators(Validators.required)
                }
              if (this.echangeData[this.formInput[i]['label'].replace(/ /g, '_')] != undefined) { 
                 this.myFormGroup.controls[this.formInput[i]['label']].setValue(this.echangeData[this.formInput[i]['label'].replace(/ /g, '_')])
                }else {
                this.myFormGroup.controls[this.formInput[i]['label']].setValue('') 
  
               }
  
  
              if (this.formInput[i]['type'] == 'startDate') {
  
                this.startDate.setValue(this.formInput[i]['value'])
                console.log(i, ' *startDate ***  ', this.myFormGroup.controls[this.formInput[i]['label']])
  
              }
              if (this.formInput[i]['type'] == 'endDate') {
                this.endDate.setValue(this.formInput[i]['value'])
  
                //console.log( i, ' *startDate ***  ', this.myFormGroup.controls[this.formInput[i]['label']] ) 
  
              }
  
            }   
          }
          //  prepare data for two column 
          let keys=Object.keys(this.formInputLoop)
          for (var el = 0 ; el < this.formInputLoop.length;el++ ){
             if ( el  % 2 == 0 )
             this.formInputLoop1.push(this.formInputLoop[el])
             else
             this.formInputLoop2.push(this.formInputLoop[el])
             }
         } else this.formInput = []
  
      
         };
  
    onSelectMultipleChange(event:any){
       this.multipleSelectedValue=event;
  
    }
  
  
  
  SelectOnChange(event:any){
  this.FilterColumnType=event.toUpperCase().includes('DATE') || event.toUpperCase().includes('DAY')
  }
  
  pickerEvent(event:any){
     this.selectedDate=event.value;
     this.myFormGroup.controls['Filter Value'].setValue(this.selectedDate.getFullYear() + '-' + (this.selectedDate.getMonth()+1) + '-' + ('0' + this.selectedDate.getDate()).slice(-2));
  }
  
  
    onFileChanged(event: any) {   
      this.uploadFilePath = event.target.files[0]; // get the file name     
    }
  
    patternValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
         if (!control.value) {
          console.log(' patternValidator  !!!! control.value  NULLLLL ',control.value)
          return {};
        }
        if (!control.value.toUpperCase().includes('SELECT') || 
        !control.value.toUpperCase().includes('FROM') ) {
          console.log('patternValidator control.value.dont includes("select or from ")  ')
          control.setErrors({ invalidQuery: true });
          return { invalidQuery: true };
        } else 
        {
        return {};
        }
      };
    }
  
    download(){
    let vfileToBeName =this.echangeData['Attached_File']
      const source = this.echangeData['base64'];
      const link = document.createElement("a");
      link.href = source;
      link.download = `${vfileToBeName}`
      link.click();

    }
     
    uploadFile(file:File){
  
      const uploadData = new FormData();
        
      let filename = file
     
      uploadData.append('filename', filename);
      uploadData.append('folder', this.UploadDirectory);
      const user = localStorage.getItem('user');
      if (user !== null) {
        uploadData.append('user', user);
      }
       console.log(' uploadFile ',uploadData)
  
    }
    
  
    onFolderChanged(event: any) { 
      console.log(' onFolderChanged ',event.target.files)
      var filesSelected=event.target.files
      let output = document.getElementById("listing");
      var tmpArr=[];
  
      for (let item of filesSelected) {
    
         tmpArr.push( item.webkitRelativePath)
      }
      this.csvFolder = tmpArr ; // get the file name 
    }
  
    // help modal
    showHelp(help:any)
    {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.id = "modal-help"; 
      dialogConfig.height = "450px";
      dialogConfig.width = "800px";
      dialogConfig.data = help // pass help variable to the helpcomponent
      const modalDialog = this.matDialog.open(HelpComponent, dialogConfig); // load the help component
     
    }
  
    isSelected(data:any){
  
      console.log(' isSelected  ',data)
    }
    
    // onchange checkbox function for "next"
    onCheckChangesNext(event: any) {
      // get the form array "next" and add data in every changes
      // const formArrayNext: FormArray = this.myFormGroup.get('next') as FormArray;
  
      this.formInput.map(elem => {
        if (this.dataForm[elem['label'].replace(/ /g, '_')]['type'] == 'checkbox') {
  
          let ar = this.dataForm[elem['label'].replace(/ /g, '_')]['valueSelected']
          console.log(' el ', event.target.value, '   at  ', ar.indexOf(event.target.value))
          if (ar.indexOf(event.target.value) >= 0 && !event.target.checked) {
            console.log(' remove ', event.target.value, '   at  ', ar.indexOf(event.target.value))
            ar.splice(ar.indexOf(event.target.value), 1);
          }
  
          if (ar.indexOf(event.target.value) == -1 && event.target.checked) ar.push(event.target.value);
  
          this.dataForm[elem['label'].replace(/ /g, '_')]['valueSelected'] = ar
          console.log(elem['label'], 'value  ', this.dataForm[elem['label'].replace(/ /g, '_')]['valueSelected'])
        }
  
      })
    }
  
    cancel() { 
      this.countChanged.emit(this.dataForm);
    }
  
   buildOjectFromDataForm(obj:any){
    var data:any={}
    if ( Object.keys(this.echangeData).length > 1 ){
      data["Ref"]=this.echangeData["Ref"]
    }
    for (var el in obj){
      console.log(el,obj[el]['value'])
      data[el]=obj[el]['value']
    }
    return data 
   }
  
    async onSubmit() {
    // check validation form  
    for (var i in this.formInputLoop) {
      if (!this.myFormGroup.controls[this.formInputLoop[i]['label']].valid ){
      alert(this.myFormGroup.controls[this.formInputLoop[i]['label']]+'  Form Submitted Error : '+'    '+this.formInputLoop[i]["label"])
      return 0
       }
    }
  
   
      
      let filename = this.csv // get the file name 
  
        this.formInputLoop.map(elem => {
  
          if (this.dataForm[elem['label'].replace(/ /g, '_')]['type'] == 'text' ||
            this.dataForm[elem['label'].replace(/ /g, '_')]['type'] == 'textarea') {
  
            let tmpText = this.myFormGroup.get(elem['label'])?.value//.replace(/'/g,'~').replace(/"/g,'~')
            this.dataForm[elem['label'].replace(/ /g, '_')].value = tmpText;
          } else
            if (this.dataForm[elem['label'].replace(/ /g, '_')]['type'] != 'checkbox' &&
              this.dataForm[elem['label'].replace(/ /g, '_')]['type'] != 'selectMultiple' &&
              this.dataForm[elem['label'].replace(/ /g, '_')]['type'] != 'savefile' &&
              !elem['label'].includes('Repertoire')) {
              this.dataForm[elem['label'].replace(/ /g, '_')].value = this.myFormGroup.get(elem['label'])?.value
            }
          if (elem['label'].includes('fichier1')) {
            this.dataForm[elem['label'].replace(/ /g, '_')].value = this.filename //csv['name']
          }
          if (elem['label'].includes('Repertoire')) {
            this.dataForm[elem['label'].replace(/ /g, '_')].value = this.csvFolder
            //console.log(' fichier   ffffffffff  ',JSON.stringify(this.myFormGroup.get(elem['label'])))
          }
          if (this.dataForm[elem['label'].replace(/ /g, '_')]['type'] == 'selectMultiple') {
            this.dataForm[elem['label'].replace(/ /g, '_')].value = this.multipleSelectedValue
          }
  
        })
     
      if (this.echangeData.length ==0){
        
        let data =this.buildOjectFromDataForm(this.dataForm)
        console.log('  this.dataForm length 0000000',JSON.stringify(data))
        /*await this.crudService.insertJsonDataToSheet(data,'dataObject').subscribe(data => {   
         
         console.log(' retour 0000000',data);
        }
        ) */
        this.spinerSelectedField=true
        let responseData = await this.insertJsonDataToSheet(data)
        this.spinerSelectedField=false
        console.log(' before   getAll test ',responseData)
        this.countChanged.emit(this.dataForm);
        return 0 
      }
      else {
        let data =this.buildOjectFromDataForm(this.dataForm)
        console.log(JSON.stringify(this.echangeData),'  this.dataForm length 0000000',JSON.stringify(data))
        /*await this.crudService.insertJsonDataToSheet(data,'dataObject').subscribe(data => {   
         
         console.log(' retour 0000000',data);
        }
        ) */
        this.spinerSelectedField=true
        let responseData = await this.updateJsonDataToSheet(data)
        this.spinerSelectedField=false
        console.log(' before   getAll test ',responseData)
      this.countChanged.emit(this.dataForm); 
      return 0   
      }
    }
   
    public insertJsonDataToSheet(data:any): Promise<any>{
     // let paramString1='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestValidation'
      
        
      return this.crudService.insertJsonDataToSheet(data,'dataObject').toPromise()
  }
  
  public updateJsonDataToSheet(data:any): Promise<any>{
    // let paramString1='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestValidation'
     
       
     return this.crudService.updateJsonDataToSheet(data,'dataObject').toPromise()
  }
  
    ngAfterViewInit (){
  
     /* for (var i in this.formInputLoop) {
            
        console.log(this.myFormGroup.controls[this.formInputLoop[i]['label']], 'required ',this.myFormGroup.get(this.formInputLoop[i]['label'])['error'])
         
  
        }*/
      if ( localStorage.getItem('data') != null ) {
        //this.updateProject()
        }
    
    }
    
   
  }
  

