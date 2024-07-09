import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from  '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import { RunCodeService } from '../../run-code.service';
//import * as data from '../files/confService.json'
import { UsuariosService } from 'src/app/services/usuarios.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public dataConfig:any;
  constructor(private router : Router,
    private runCodeService:UsuariosService,
    public httpclient : HttpClient) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  onSubmit() {
    console.log(' login onSubmit ')
    if(this.loginForm.valid) {
     // console.log(this._v());
     //console.log(' login submit ',this.loginForm)
      const uploadData = new FormData();
     // this.myFormGroup.get(elem['label']).value)
  uploadData.append('login', this.loginForm.controls["email"].value);
  uploadData.append('password',this.loginForm.controls["password"].value);
   console.log(' uploadFile ',uploadData)
   console.log(' mail  ',this.loginForm.controls["email"].value, '  ',this.loginForm.controls["password"].value)

        this.runCodeService.validateLogin(this.loginForm.controls["email"].value,this.loginForm.controls["password"].value).subscribe(
       
        data => {
                 console.log('login statut  ',data);
                 //alert("file succefull uploaded "+data.fileName)
                 //if (data.statut.toUpperCase()=='OK')   {
                  console.log('login statut ok ',data);
                  let token = data['token'];
                  let user = data['user']
                  
                  if ( user != localStorage.getItem('user')){
                  localStorage.clear()
                  localStorage.setItem('user', data['user']);
                  
                  
                  }
                  localStorage.setItem('mail', data['mail']);
                  localStorage.setItem('Groupe', data['groupe']);
                  localStorage.setItem('token', token);
                  console.log(' token   ',token,  '  user    ',data['user'])
                   this.router.navigate(['/ListDataObject']);
                 //this.filename=data.fileName;
                 //}
                 
                 },
        error => {console.log(error)
         
        }
      )

      
    }
  }
  _v() {
    return this.loginForm.value;
  }

   

  ngOnInit() {
    
    console.log('login ngOnInit test read json ')

    /*fetch('../files/confService.json').then(res => res.json())
    .then(jsonData => {
      this.dataConfig = jsonData;
    },
    error);*/
  }
   
}
