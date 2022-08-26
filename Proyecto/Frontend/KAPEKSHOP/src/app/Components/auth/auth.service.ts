import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http:HttpClient, private router:Router) { }
    
    leerToken(){
        let token = localStorage.getItem('token');
        if( token ){
            const tokenExpiro = helper.isTokenExpired(token); // helper
            //eliminar token
            console.log(tokenExpiro);
            if(tokenExpiro){
                console.log(tokenExpiro);
                this.cerrarSesion()
            }
            return tokenExpiro ? false: true;
        }

        return false;

    }


    cerrarSesion(){
        localStorage.removeItem('token');
        this.router.navigate(["/"]);
    }

}
