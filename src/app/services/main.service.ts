import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  

  updateUserRequestValidation(data: any) { 
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain' //application/x-www-form-urlencoded'
    });
    
    console.log(' updateUserRequestValidation  '+JSON.stringify(data))
    return this.http.post('https://script.google.com/macros/s/AKfycbyYZaig9d7szFHhq6AfzjbE5O3UVioXlryqBU4vbQ9hOc1UhqdIqCShX8h-IBakpDFP/exec', data, { headers: headers })
    .pipe(catchError(err => {
      if (err.status === 404) {
        console.log(`error input data `);
        return EMPTY
      }
      return EMPTY
    })
    );
  }
  

  updateUserRequestTask(data: any) { 
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain' //application/x-www-form-urlencoded'
    });
    
    console.log(' updateUserRequestTask  '+JSON.stringify(data))
    return this.http.post('https://script.google.com/macros/s/AKfycbw3SWAJAo371gbhLMU7IaYM-HIpdnYZlmZEJ7Ym-4HQncJ_wKISTYNig_biTpYPLqdm_g/exec', data, { headers: headers })
    .pipe(catchError(err => {
      if (err.status === 404) {
        console.log(`error input data `);
        return EMPTY
      }
      return EMPTY
    })
    );
  }
  
updateJsonDataToSheetyKey( data: any ){

  const headers = new HttpHeaders({

    'Content-Type': 'text/plain' //application/json' //text/plain' //  '
  });


  //let dataParam={"data":data,"action":"updateJsonDataToSheetyKey","sheet":sheetName}
  //data={"action":"login","mail":"mounir.melliti@orange.com","password":"mounir2023"    }
  return this.http.post<any>('https://script.google.com/macros/s/AKfycbwDM3w3HqEczK7r_kr_bn3-klG_CQZzH35MN1n5EVVXLt5_ynSSGGF-M-1huc2X82qh/exec', data, { headers: headers })
  .pipe(catchError(err => {
    if (err.status === 404) {
      console.log(`error input data `);
      return EMPTY
    }
    return EMPTY
  })
  );
}


getDataByCols(sheet:string,paramString:any ){
  console.log(' service getAllUserInteractionRequest ')
 // return this.http.get<any>('https://script.google.com/macros/s/AKfycbwXtCXWWJlXyAVZah-8EnoddGTzVDM6oDhtNw6DsI0tfOu8CuZikDQhYEUzKWsh0GMz/exec?sheet='+sheet+'&action=getDataByCols&data='+JSON.stringify(paramString));
 // return this.http.get<any>('https://script.google.com/macros/s/AKfycby3ppuOjYaA6I9K4PCet6h_nhomWov4gV1TwY9e9SS_1nNSUjzRxsPeshPaVUcVM5g/exec?sheet='+sheet+'&action=getDataByCols&data='+JSON.stringify(paramString));
  return this.http.get<any>('https://script.google.com/macros/s/AKfycby9493uuGCkiVve2kw4zEpjy4LhWv_m7kCRfe2x8xfIYwZhGH-9aM67o1RvgfTjPISV3g/exec?sheet='+sheet+'&action=getDataByCols&data='+JSON.stringify(paramString));

}




validateLogin( email: string, password: string ){

  const headers = new HttpHeaders({

    'Content-Type': 'text/plain' //application/json' //text/plain' //  '
  });


  let data={"mail":email,"password":password,"action":"login"}
  //data={"action":"login","mail":"mounir.melliti@orange.com","password":"mounir2023"    }
  return this.http.post<any>('https://script.google.com/macros/s/AKfycbyTwIObJFaxiem0-1gDdThfQ3cbd-qISMfxuiDz3tflCWpNqhojUnA8TayAbQcXZxE/exec', data, { headers: headers })
  .pipe(catchError(err => {
    if (err.status === 404) {
      console.log(`error input data `);
      return EMPTY
    }
    return EMPTY
  })
  );
}

getObjectMergedRequest(data:any){

  const headers = new HttpHeaders({

    'Content-Type': 'text/plain' //application/json' //text/plain' //  '
  });

  //let data={"sheet":"dataObject","action":"mergeObjectWithRequestUserByKeyToSubscribed",
  //"data":{"joinedSheetName":"userRequest", "mergeKey":"Ref_Object",  "filtredFieldValue" : {"User":"ExtMounirMelliti" } } }
  
  return this.http.post<any>('https://script.google.com/macros/s/AKfycby9iLPjnu3cSMRYzgpYssGt2jAIsoMqyr1u7_OTkHP1kciJEqnoKRSk7pJRiQ_VvX4f/exec', data, { headers: headers })
   .pipe(catchError(err => {
    if (err.status === 404) {
      console.log(`error input data `);
      return EMPTY
    }
    return EMPTY
  })
  );
}


 
getAllUsers(){
  console.log(' service getAllUsers ')
  return this.http.get<any>('https://script.google.com/macros/s/AKfycbwxaVzd4uJSw7KAt6WI50nQkMaiCU44x8CJJXYl93k/dev?action=listAll1&sheet=user'); //http://localhost:8080/getAllUsers');


}

insertJsonDataToSheet(data: any, sheet:string) {
  const headers = new HttpHeaders({
    'Content-Type': 'text/plain' //application/x-www-form-urlencoded'
  });
  
 // console.log(' add send  '+JSON.stringify(usuario))
 const obj ={
  "data":data,
  "sheet":sheet,
  "action":"insert"
  }  
console.log('  service  0000000',JSON.stringify(obj)) ;
  return this.http.post('https://script.google.com/macros/s/AKfycbxAPw2m8mD26IMhYnylGDEZdR9sIaFXmaEMjYKh0ebOog8ROvhqAFZaX8RS-39P2pOgDA/exec',obj, { headers: headers })
  .pipe(catchError(err => {
    if (err.status === 404) {
      console.log(`error input data `);
      return EMPTY
    }
    return EMPTY
  })
  );
}


getAllRowsSheet(sheet: string): Observable<any> {

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
  return this.http.get('https://script.google.com/macros/s/AKfycby08kD0RuQqrbMKWfsUa7ixSk59Ze5Ebfn7TndA4CXolSALY1-t7VjMB2aL1zlbonb0/exec?action=listAll&sheet='+sheet)
  //https://script.google.com/macros/s/AKfycbwxaVzd4uJSw7KAt6WI50nQkMaiCU44x8CJJXYl93k/exec?action=listAll&sheet=user, {headers: headers}) //http://localhost:8080/getAllUsers');
    .pipe(catchError(err => {
      if (err.status === 404) {
        console.log(`sheet ${sheet} not found`);
        return EMPTY
      }
      return EMPTY
    })
    );
}

appendUserRequest(data:any){
  const headers = new HttpHeaders({
   'Content-Type': 'text/plain' //application/x-www-form-urlencoded'
 });
 let dataObject={'data':data,
'action':'appendUserRequest',
'sheet':'userRequest'}
 console.log(' appendUserRequest ' , JSON.stringify(data))
 //localhost:8080/appendUserRequest
 //return this.http.post('https://script.google.com/macros/s/AKfycbxowI4xn-adEG-GZl0npmt-WNePZu7IKAtuLaZj8nnlQofOeyjDWAakQLLZndacT4sD/exec', dataObject, { headers: headers })
 //return this.http.post('https://script.google.com/macros/s/AKfycbz_TpRVhIYlUljeWtTNckyYy1lSB8lybUjhg18RODFBYeXC18Q0Y2IUtTqrKHiFp1VQ/exec', dataObject, { headers: headers })
 return this.http.post('https://script.google.com/macros/s/AKfycbxa8El-MkBFtJfU2lZwoc_tGP2wSaI6oLTlO5sV7mG56gH3-9QsW7EqK8-PqbIZFMcPDw/exec', dataObject, { headers: headers })
 .pipe(catchError(err => {
  if (err.status === 404) {
    console.log(`sheet  not found`);
    return EMPTY
  }
  return EMPTY
})
);
}


}