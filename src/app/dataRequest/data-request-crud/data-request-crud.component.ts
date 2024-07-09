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
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormArray
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { EchangeData } from 'src/app/_interface/EchangeData';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service'; 


//import {MatCheckboxModule} from '@angular/material/checkbox';



interface sqltype {
  nature: String;
}

@Component({
  selector: 'app-data-request-crud',
  templateUrl: './data-request-crud.component.html',
  styleUrls: ['./data-request-crud.component.css']
})
export class DataRequestCrudComponent implements OnInit {
   
  
   colomns : any = []
    selected :any
    myFormGroup: FormGroup;
    blockArray = new FormArray([])
    //formTemplate:any = form_template;
    selectedDate: Date = new Date();
    dateVariable : Date = new Date();
    FilterColumnType =false;
    group :any = {};
    formInput: any[]=[];
    formInputLoop: any[]=[];
    formInputLoop1: any[]=[];
    formInputLoop2: any[]=[];
    title: String='';
    filename : String='';
    uploadFilePath: File | null = null;
    //csv: File | null = null;
    csv:string='';
    folderUpload="";
    submitLabel="Configure"
    csvFolder:string[]= [] ;//| null = null;
    Blocks!: [];
    subscription!: Subscription;
    sql_type: sqltype[] = [{ nature: 'insertion' }, { nature: 'selection' }];
    static_controls = ['action','type','id','idmodule','id_base']
    public filenameValue : String='';
    public filenameFinal : String='';
    public nextElements : any[] = []
    public previousElements : any[] = []
    public multipleSelectedValue:string[]=[]; 
    public choiceAndOr:string=" AND "
    public formKeys=[]
   
    startDate = new FormControl(new Date());
    endDate = new FormControl(new Date());
  
    /////////////////////////////
    /*public echangeData1 : EchangeData ={displayedColumns:[],data:[],
      actionColumns:[],actionButton:{ Button:"action",Column:"Type",Label:"Abonner"}
     ,type:'df'}*/
     public echangeData1 : EchangeData ={displayedColumns:[],data:[],actionColumns:[],actionButton:{},type:'df'}
     public echangeData2 : EchangeData ={displayedColumns:[],data:[],actionColumns:[],actionButton:{},type:'df'}
   
    public displayedColumns1 = [];
    public displayedColumns2 = [];
   
      
  
    constructor(public matDialog: MatDialog, //private localStorageService: LocalstorageService, 
    //  private runCodeService : RunCodeService,
    private usuariosService : UsuariosService,
      public httpClient: HttpClient, 
      //public restApi: ModuleApiService, 
      //public receive: BehaviorService, 
      private formBuilder: FormBuilder) {
  
      this.myFormGroup = new FormGroup(this.group);
      
    }
    cronstrue1=""
    dataForm:any=[]
    projet!:{name:string,version:string,creationDate:string,createdBy:string}
    projet_name=""
    projet_version=""
    projet_creationDate=""
    projet_createdBy=""
    moduleIndex = -1;
    @Input() modules = [];
    interval: any;
    submittedValue: any;
    currentModule="";
    currentAction: String='';
    addFilterButton:Boolean=false;
    @Input() message!: [];
    @Input() echangeData: any ;
  
    @Output() countChanged: EventEmitter<any> =   new EventEmitter();
  
    public dataConf : any={};
    
    public form : any={};
  
    public getJson(): Promise<any>{
       
      console.log(' json  getJson ')  
      return this.httpClient.get("assets/requestForm.json").toPromise()
   }
    async  ngOnInit() {
      this.dataConf = await this.getJson()
      this.form=this.dataConf['form']
      console.log('form  ',this.form)
   
      this.echangeData1.displayedColumns=[] //this.displayedColumns;
      this.echangeData1.actionColumns=[]
      this.echangeData2.displayedColumns=[] //this.displayedColumns;
      this.echangeData2.actionColumns=[]
      let paramString1='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestValidation'
      
      console.log(' paramString ',paramString1)
  
      console.log('ngOnInit echangeData ',this.echangeData)
      this.group = {};
      this.formInput=[];
      this.formInputLoop=[];
      this.myFormGroup = new FormGroup(this.group);
      let myDate: Date = new Date();
  
       let today = myDate.getFullYear() + '-' + (('0' + (myDate.getMonth()+1)).slice(-2)) + '-' + ('0' + myDate.getDate()).slice(-2) ;  
  
      
        let data ={action:'action',id:5,type:'type',currentModule:'module321',droppedModules:[],
        form: this.form 
         }
      
     // this.receive.SendMessage.subscribe((data: any) => {
      let dataSize = Object.keys(data).length;
      
      //  this.projet = { name: "Not saved !!! ", version: "01", creationDate: "10/01/2022", createdBy: localStorage.getItem('user') }
      
      this.currentModule = data['currentModule']
      this.currentAction=data['action']
      console.log('  currentAction  ', this.currentAction)
      if ( this.currentAction=='Impala' || this.currentAction=='ImpalaAgg'){
        this.group['andOrOptions'] = new FormControl('')
        this.myFormGroup.controls['andOrOptions'].setValue(' AND ')  ;
      }
  
      this.formInput = []
      this.submitLabel='Close'
        if (!(typeof data['form'] === 'undefined')) {
          const dataFormClone = cloneDeep(data['form']);
    
          this.dataForm = dataFormClone
          this.formInput = Object.values(dataFormClone);
  
   
          for (var i in this.formInput) {
          
           
            if (this.formInput[i]['hide'] != 1) {
              this.formInputLoop.push(this.formInput[i])
              console.log(i, ' ******  ', this.formInput[i]['label'],'  ',this.echangeData[this.formInput[i]['label'].replace(/ /g, '_')] , '  value echange data ',this.echangeData)
              this.group[this.formInput[i]['label']] = new FormControl('')//, [Validators.required])
               if (this.echangeData[this.formInput[i]['label'].replace(/ /g, '_')] != undefined) {
                 this.myFormGroup.controls[this.formInput[i]['label']].setValue(this.echangeData[this.formInput[i]['label'].replace(/ /g, '_')])
                 console.log(i, ' ******  ', this.formInput[i]['label'],'  ',this.myFormGroup.controls[this.formInput[i]['label']]['value'], '  value echange data ', this.echangeData[this.formInput[i]['label'].replace(/ /g, '_')])
               }
  
  
              if (this.formInput[i]['type'] == 'startDate') {
  
                this.startDate.setValue(this.formInput[i]['value'])
                console.log(i, ' *startDate ***  ', this.myFormGroup.controls[this.formInput[i]['label']])
  
              }
              if (this.formInput[i]['type'] == 'endDate') {
                this.endDate.setValue(this.formInput[i]['value'])
  
                //console.log( i, ' *startDate ***  ', this.myFormGroup.controls[this.formInput[i]['label']] ) 
  
              }
  
            }   else {
              //const index = this.formInput.indexOf(this.formInput[i]);
              //if (index > -1) { // only splice array when item is found
              //  this.formInput.splice(i, 1); // 2nd parameter means remove one item only
             // }
            }
          }
  
          //////////////
          let keys=Object.keys(this.formInputLoop)
          for (var el = 0 ; el < this.formInputLoop.length;el++ ){
             if ( el  % 2 == 0 )
             this.formInputLoop1.push(this.formInputLoop[el])
             else
             this.formInputLoop2.push(this.formInputLoop[el])
             }
            
             console.log('this.formInputLoop  ',this.formInputLoop)
   
             console.log('this.formInputLoop1  ',this.formInputLoop1)
             console.log('this.formInputLoop2  ',this.formInputLoop2)
  
          //this.myFormGroup.controls['Type'].setValue('DB', {onlySelf: true});
        } else this.formInput = []
     // });
    
      
    };
  
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
      uploadData.append('folder', this.folderUpload);
      const user = localStorage.getItem('user');
      if (user !== null) {
        uploadData.append('user',user);
      }
      console.log(' uploadFile ',uploadData)
  
    }
    
  
  
    onSelectMultipleChange(event:any){
       this.multipleSelectedValue=event;
  
    }
  
  
  
  SelectOnChange(event:any){
  //let cronString=""+this.myFormGroup.controls['Minute'].value+" "+this.myFormGroup.controls['Hour'].value+" "+this.myFormGroup.controls['day of month'].value+" "+this.myFormGroup.controls['Month'].value+" "+this.myFormGroup.controls['day of week'].value
  
  //console.log(cronString,'  select event change >>>>>>>>>>>>>>>>>>  ',event)
  this.FilterColumnType=event.toUpperCase().includes('DATE') || event.toUpperCase().includes('DAY')
  }
  
  pickerEvent(event:any){
    console.log(' date picked   :::::::::::::::: ',event)
    this.selectedDate=event.value;
    //this.myDate.getFullYear() + '-' + (this.myDate.getMonth()+1) + '-' + ('0' + this.myDate.getDate()).slice(-2) ;
    this.myFormGroup.controls['Filter Value'].setValue(this.selectedDate.getFullYear() + '-' + (this.selectedDate.getMonth()+1) + '-' + ('0' + this.selectedDate.getDate()).slice(-2));
  }
  
  
    onFileChanged(event: any) {
      console.log(' onFileChanged ',event.target.files[0])
     
     
      this.uploadFilePath = event.target.files[0]; // get the file name  
      
    }
  
    patternValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        //console.log(' patternValidator  control.value ',control.value)
        if (!control.value) {
          console.log(' patternValidator  !!!! control.value  NULLLLL ',control.value)
          return {};
        }
        const valid = control.value.includes("*")
        const valid1 = control.value.includes("()")
        const queryAr = control.value.toUpperCase().split(' ')
        const queryKeyWord=['SELECT','FROM','WHERE']
        const lastWord= queryAr.pop()
        console.log('patternValid lastWord ', lastWord)
        const valid2= queryKeyWord.includes(queryAr.pop())
        //console.log(' patternValid  valid2 ',valid2)
        const countOpen=(control.value.match(/\(/g) || []).length
        const countClose=(control.value.match(/\)/g) || []).length
        if (!control.value.toUpperCase().includes('SELECT') || 
        !control.value.toUpperCase().includes('FROM') ) {
          console.log('patternValidator control.value.dont includes("select or from ")  ')
          control.setErrors({ invalidQuery: true });
          return { invalidQuery: true };
        }
  
        if ( valid || valid1 || valid2 ||countOpen!=countClose ){
          console.log(' patternValidator control.value.includes("*")  countOpen!=countClose ')
          control.setErrors({ invalidQuery: true });
          return { invalidQuery: true };
        }else {
        return {};
        }
      };
    }
  
    queryNotValid(query: string) {
      return (formGroup: AbstractControl): ValidationErrors | null => {
        const queryControl :any= formGroup.get(query);
        //const confirmPasswordControl = formGroup.get(confirmPassword);
  
        const countOpen=(queryControl.value.match(/\(/g) || []).length
        const countClose=(queryControl.value.match(/\)/g) || []).length
        if (!queryControl.value.toUpperCase().includes('SELECT') || 
        !queryControl.value.toUpperCase().includes('FROM') ) {
          queryControl.setErrors({ syntaxError: true });
          return { syntaxError: true };
        }
  
        if (countOpen != countClose) {
          queryControl.setErrors({ syntaxError: true });
          return { syntaxError: true };
        } 
        
        if (queryControl.value.includes('*')) {
          queryControl.setErrors({ syntaxError: true });
          return { syntaxError: true };
        }
        else {
          queryControl.setErrors(null);
          return null;
        }
      };
    }
  
    
  
    onFolderChanged(event: any) { 
      console.log(' onFolderChanged ',event.target.files)
      var filesSelected=event.target.files
      let output = document.getElementById("listing");
      var tmpArr=[];
  
      for (let item of filesSelected) {
    
       // tmpArr.push( item.webkitRelativePath+' '+item.name)
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
     // const modalDialog = this.matDialog.open(HelpComponent, dialogConfig); // load the help component
     
    }
  
    isSelected(data:any){
  
      console.log(' isSelected  ',data)
    }
    // onchange checkbox function for "next"
    onCheckChangesNext(event: any) {
      // get the form array "next" and add data in every changes
     // const formArrayNext: FormArray = this.myFormGroup.get('next') as FormArray;
      console.log(' onCheckChangesNext ',event.target.value, ' checked ')
      /* Selected */
  
  
      this.formInput.map(elem => {
        // this.myFormGroup.removeControl(elem['label']); // remove controls
        if ( this.dataForm[elem['label'].replace(/ /g,'_')]['type']=='checkbox') {
         
          let ar=this.dataForm[elem['label'].replace(/ /g,'_')]['valueSelected'] 
          console.log(' el ',event.target.value, '   at  ',ar.indexOf(event.target.value))
          if ( ar.indexOf(event.target.value) >= 0 &&  !event.target.checked ) {
            console.log(' remove ',event.target.value, '   at  ',ar.indexOf(event.target.value))
            ar.splice(ar.indexOf(event.target.value), 1);
          }
  
          if ( ar.indexOf(event.target.value) == -1 && event.target.checked) ar.push(event.target.value);
  
          this.dataForm[elem['label'].replace(/ /g,'_')]['valueSelected']=ar
         console.log(elem['label'],'value  ',this.dataForm[elem['label'].replace(/ /g,'_')]['valueSelected'])
        } 
          
       })
    
  
    }
  
   
    // onchange checkbox function for "previous"
   
    onSubmit() {
  
    for (var i in this.formInputLoop) {
      console.log(this.myFormGroup.controls[this.formInputLoop[i]['label']].valid,'  reuest crud before validation : ','    ',this.formInputLoop[i]['label'],' --> ',this.myFormGroup.controls)
      if (!this.myFormGroup.controls[this.formInputLoop[i]['label']].valid ){
      alert(this.myFormGroup.controls[this.formInputLoop[i]['label']]+'  Form Submitted Error : '+'    '+this.formInputLoop[i]["label"])
      return 0
       }
    }
  
  
    if ( this.uploadFilePath != undefined){
      //swal.fire({title:'Please wait',allowOutsideClick: false,
      //allowEscapeKey: false,
      //allowEnterKey: false})
      //:swal.showLoading()
      this.uploadFile(this.uploadFilePath);
      this.uploadFilePath=null;
      this.countChanged.emit([]);
      
      return 1
    }
  
   
      
      let filename = this.csv // get the file name 
  
      
  
      // remove all the FormControls and FormArray after change to configure other module
      const todo = 'new';
     
  
         console.log(' formInput 1 ',this.formInput)
  
      this.formInputLoop.map(elem => {
       // this.myFormGroup.removeControl(elem['label']); // remove controls
       console.log(' elem index ',elem['label'],' ',this.dataForm[elem['label'].replace(/ /g,'_')], '  this.dataForm  ',this.dataForm)
   
        if (this.dataForm[elem['label'].replace(/ /g,'_')]['type']=='text' || 
          this.dataForm[elem['label'].replace(/ /g,'_')]['type']=='textarea') {
            console.log(' before >>>>> ',this.myFormGroup.get(elem['label'])!.value)
      //this.myFormGroup.get(elem['label']).setValue(this.myFormGroup.get(elem['label']).value.replace(/'/g,'~').replace(/"/g,'~'))
      
      let tmpText =this.myFormGroup.get(elem['label'])!.value//.replace(/'/g,'~').replace(/"/g,'~')
      this.dataForm[elem['label'].replace(/ /g,'_')].value=tmpText;
      console.log(' after  >>>>> ',this.myFormGroup.get(elem['label'])!.value)
    }else 
    if (this.dataForm[elem['label'].replace(/ /g,'_')]['type']!='checkbox' && 
           this.dataForm[elem['label'].replace(/ /g,'_')]['type']!='selectMultiple'  &&
           this.dataForm[elem['label'].replace(/ /g,'_')]['type']!='savefile' &&
           //!elem['label'].includes('folder')  &&
           !elem['label'].includes('Repertoire')     ){
            console.log(' elem type  ',this.dataForm[elem['label'].replace(/ /g,'_')]['type'])
            this.dataForm[elem['label'].replace(/ /g,'_')].value=this.myFormGroup.get(elem['label'])!.value
          }
          console.log(elem['label'],' test 2',this.dataForm[elem['label'].replace(/ /g,'_')])
          if ( elem['label'].includes('fichier1') ){
          this.dataForm[elem['label'].replace(/ /g,'_')].value=this.filename //csv['name']
          console.log(' fichier   ffffffffff  ',JSON.stringify(this.myFormGroup.get(elem['label'])))
          }
          if ( elem['label'].includes('Repertoire') ){
            this.dataForm[elem['label'].replace(/ /g,'_')].value=this.csvFolder 
            //console.log(' fichier   ffffffffff  ',JSON.stringify(this.myFormGroup.get(elem['label'])))
            }
          console.log(' fichier   ffffffffffffff  ',this.dataForm[elem['label'].replace(/ /g,'_')]['type'])
         if (this.dataForm[elem['label'].replace(/ /g,'_')]['type']=='selectMultiple' ){
          this.dataForm[elem['label'].replace(/ /g,'_')].value=this.multipleSelectedValue
          console.log(' fichier   ffffffffffffff  value  ',  this.multipleSelectedValue)
        }
  
      })
     
      console.log(' this.startDate 2222222222222 ',{'startDate':{'type':'startDate','label':'startDate','value':this.startDate.value}},{'endDate':{'type':'endDate','label':'endDate','value':this.endDate.value}})
      var sdate=new Date()    
      var edate=new Date()
      if (this.startDate.value != null ) sdate=new Date(this.startDate.value)
      if (this.endDate.value != null ) edate=new Date(this.endDate.value)
        console.log('  this.dataForm 2222222222222 ',this.dataForm)
      this.countChanged.emit(this.dataForm);
      return 0   
    }
  
    public GetuserRequestApprove(): Promise<any>{
      let paramString1='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestValidation'
      let o={'Ref_Request':this.echangeData['Ref_Request']}
  
     
     return this.usuariosService.getDataByCols('userRequestValidation',o).toPromise()
        
    //  return this.usuariosService.getDataByCol(paramString1).toPromise()
  }
  
  public GetuserRequestTask(): Promise<any>{
    let paramString2='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestTask'
   
    let o={'Ref_Request':this.echangeData['Ref_Request']}
  
     
    return this.usuariosService.getDataByCols('userRequestTask',o).toPromise()
         
   // return this.usuariosService.getDataByCol(paramString2).toPromise()
  }
   
  async ngAfterViewInit (){
  
    let responseData = await this.GetuserRequestApprove(); // 
    this.echangeData1.data = responseData;
    let responseData1 = await this.GetuserRequestTask(); 
    this.echangeData2.data = responseData1;
    if (responseData.code == 5) {
         console.log(' response 1 OK')
    }
      /*  let paramString2='colName=Ref_Request&colValue='+this.echangeData['Ref_Request']+'&sheet=userRequestTask'
     
        this.usuariosService.getDataByCol(paramString2).subscribe(data2 => {
          
        this.echangeData2.data = data2;
        console.log(' getUserRequestValidation this.echangeData1.data '+JSON.stringify(this.echangeData2.data))
    
        console.log(' getUserRequestValidation '+JSON.stringify(data2))
       })
    */
    }
    
   
  }
  