//import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(//public jwtHelper: JwtHelperService
    ) { }

  public isAuthenticated(): boolean {
   // const helper = new JwtHelperService();
    const token = 1; //localStorage.getItem('token');
    return token ==1
   /* if (token) {
      return !helper.isTokenExpired(token);
    }
    else {
      return false;
    }*/
  }

}