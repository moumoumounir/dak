import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ChiffreService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getBanqueCategorie() {
    return this.http.get<any>('http://localhost:8080/getBanqueCategorie');
  }

  getCaisseCategorie() {
    return this.http.get<any>('http://localhost:8080/getCaisseCategorie');
  }

  getAllChequeEnCaisse() {

    return this.http.get<any>('http://localhost:8080/getAllChequeEnCaisse');
  }
  getRecouvrement() {

    return this.http.get<any>('http://localhost:8080/getRecouvrement');
  }
  getAllUnpaid()
  {

    return this.http.get<any>('http://localhost:8080/getAllUnpaid');
  }
  DeleteUnpaid(ref){

    return this.http.get<any>('http://localhost:8080/deleteUnpaid/'+ref);

  }
  
}
