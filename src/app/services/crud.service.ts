
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../clases/usuarios';
import { throwError, Observable, EMPTY } from "rxjs";

import {catchError, map} from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class  CrudService  {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  

//
insertJsonDataToSheet(data: any, sheet:string) {
  const headers = new HttpHeaders({
    'Content-Type': 'text/plain' //application/x-www-form-urlencoded'
  });
  console.log('  service  0000000') 
 // console.log(' add send  '+JSON.stringify(usuario))
 const obj ={
  "data":data,
  "sheet":"dataObject",
  "action":"insert"
  }  

  return this.http.post('https://script.google.com/macros/s/AKfycbw_t57kbsgeHTguLrzhniSB59h9vEYhsMapkk4VVsHvVfd6H8PE9AevsOcSkjFiMI1N/exec',obj, { headers: headers })
  .pipe(catchError(err => {
    if (err.status === 404) {
      console.log(`error input data `);
      return EMPTY
    }
    return EMPTY
  })
  );
}


  getDataBySheet(city: string): Observable<any> {

    let head = new HttpHeaders();
      head.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, content-type');
      head.append('Access-Control-Allow-Methods', 'GET');
      head.append('Access-Control-Allow-Origin', '*');
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/json' //application/x-www-form-urlencoded'
      });
      
      //return this.http.get(this.baseWeatherURL + city + this.urlSuffix, {headers: head})
      return this.http.get('https://script.google.com/macros/s/AKfycby08kD0RuQqrbMKWfsUa7ixSk59Ze5Ebfn7TndA4CXolSALY1-t7VjMB2aL1zlbonb0/exec?action=listAll&sheet=user')
         .pipe(catchError(err => {
          if (err.status === 404) {
            console.log(`City ${city} not found`);
            return EMPTY
          }
          return EMPTY
        })
        );
    }

    insertJsonDataBySheet(data: any, sheet:string): Observable<any> {

      let head = new HttpHeaders();
        head.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, content-type');
        head.append('Access-Control-Allow-Methods', 'GET');
        head.append('Access-Control-Allow-Origin', '*');
        const headers = new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Accept-Language': 'en_US',
          'Content-Type': 'application/json' //application/x-www-form-urlencoded'
        });
        
        //return this.http.get(this.baseWeatherURL + city + this.urlSuffix, {headers: head})
        return this.http.get('https://script.google.com/macros/s/AKfycby08kD0RuQqrbMKWfsUa7ixSk59Ze5Ebfn7TndA4CXolSALY1-t7VjMB2aL1zlbonb0/exec?action=insert&sheet=user&Data={}')
        .pipe(catchError(err => {
            if (err.status === 404) {
              console.log(`Row not found`);
              return EMPTY
            }
            return EMPTY
          })
          );
      }
  

      //insertJsonDataToSheet(data: any, sheet:string) {
        updateJsonDataToSheet(data: any, sheet:string) {
          const headers = new HttpHeaders({
            'Content-Type': 'text/plain' //application/x-www-form-urlencoded'
          });
          console.log('  service  0000000') 
         // console.log(' add send  '+JSON.stringify(usuario))
         const obj ={
          "data":data,
          "sheet":"dataObject",
          "action":"update"
          } 
      
          return this.http.post('https://script.google.com/macros/s/AKfycbw_t57kbsgeHTguLrzhniSB59h9vEYhsMapkk4VVsHvVfd6H8PE9AevsOcSkjFiMI1N/exec',obj, { headers: headers })
          .pipe(catchError(err => {
            if (err.status === 404) {
              console.log(`error input data `);
              return EMPTY
            }
            return EMPTY
          })
          );
        }
   
    deleteRowSheet(row_id: string, sheet:string) {
      const headers = new HttpHeaders({
        'Content-Type': 'text/plain' //application/x-www-form-urlencoded'
      });
      console.log('  service  0000000') 
     // console.log(' add send  '+JSON.stringify(usuario))
     const obj ={
      "id":row_id,
      "sheet":sheet,
      "action":"delete"
      } 
      return this.http.post('https://script.google.com/macros/s/AKfycbw_t57kbsgeHTguLrzhniSB59h9vEYhsMapkk4VVsHvVfd6H8PE9AevsOcSkjFiMI1N/exec',obj, { headers: headers })
      .pipe(catchError(err => {
        if (err.status === 404) {
          console.log(`error input data `);
          return EMPTY
        }
        return EMPTY
      })
      );
    }
  /*
  updateUserRequestValidation(data: any) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Accept-Language': 'en_US',
      'Content-Type': 'application/json' //application/x-www-form-urlencoded'
    });
    
    console.log(' edit send  '+JSON.stringify(data))
    return this.http.post('http://localhost:8080/updateUserRequestValidation/', data, { headers: headers })

  }

////////
updateDataSheetByKey(data: any) {
  const headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Accept-Language': 'en_US',
    'Content-Type': 'application/json' //application/x-www-form-urlencoded'
  });
  
  console.log(' edit send  '+JSON.stringify(data))
  return this.http.post('http://localhost:8080/updateDataSheetByKey/', data, { headers: headers })

}



  
  // tslint:disable-next-line:typedef
  login( email: string, password: string ){
    
    return this.http.get<any>('http://localhost:8080/login?email='+email+'&password='+password ) .pipe(
      catchError((err) => {
        console.log('error caught in service')
        //console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    );
  }


getDataAcceesApproval(){
  console.log(' service getAllUsers ')
  return this.http.get<any>('http://localhost:8080/getDataAcceesApproval');
}

getUserRequest(){
  console.log(' service getUserRequest ')
  return this.http.get<any>('http://localhost:8080/getUserRequest');
}

getUserRequestValidation(){
  console.log(' service getUserRestValidation ')
  return this.http.get<any>('http://localhost:8080/getUserRequestValidation');
}

getDataByCol(paramString){
  console.log(' service getUserRestValidation ')
  return this.http.get<any>('http://localhost:8080/getDataByCol/?'+paramString);
}
getDataByCols(paramObj){

  const headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Accept-Language': 'en_US',
    'Content-Type': 'application/json' //application/x-www-form-urlencoded'
  });
  
  
return this.http.post('http://localhost:8080/getDataByCols/',paramObj, { headers: headers });
}


getAllUserInteractionRequest(paramString ){
  console.log(' service getAllUserInteractionRequest ')
  return this.http.get<any>('http://localhost:8080/getAllUserInteractionRequest/?'+paramString);
}


getObjectMergedRequest(){
  console.log(' service getObjectMergedRequest ')
  return this.http.get<any>('http://localhost:8080/mergeObjectWithRequestUserByKeyToSubscribed/ExtMounirMelliti');
}


getAllUsers(){
  console.log(' service getAllUsers ')
  return this.http.get<any>('http://localhost:808011/getAllUsers');
}
getAllDataObject(){
  console.log(' service getAllUsers ')
  return this.http.get<any>('http://localhost:8080/getAllDataObject');
}

appendUserRequest(data:any){ 
  const headers = new HttpHeaders({
   'Access-Control-Allow-Origin': '*',
   'Accept': 'application/json',
   'Accept-Language': 'en_US',
   'Content-Type': 'application/json' //application/x-www-form-urlencoded'
 });
 
 return this.http.post('http://localhost:8080/appendUserRequest/', data, { headers: headers })

}

checkUserMail(Email){
  console.log('Check User Mail ')
  return this.http.get<any>('http://localhost:8080/getDataSheetByColName/?sheet=user&colName=Email&colValue='+Email);
     
  }
  */
}

