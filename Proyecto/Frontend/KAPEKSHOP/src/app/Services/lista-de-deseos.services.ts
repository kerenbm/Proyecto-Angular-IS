import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaDeseosService {

    constructor(private http:HttpClient){}

    getListaDeseos(){}
/*se tiene que mandar el id del producto y el id del usuario actual*/
    agregarAListaDeseos(idUsuario: any, idProducto: any): Observable<any> {
        let url = `http://localhost:3000/producto/aniadirDeseos/`;
        return this.http.post(url,{ idUsuario, idProducto});
    }

    obtenerListaDeseos(idUsuario: any): Observable<any> {
        let url = `http://localhost:3000/producto/lista-de-deseos/${idUsuario}`
        return this.http.get(url)
    }

    eliminarDeListaDeseos(idUsuario: any, idProducto: any): Observable<any>{
        let url = `http://localhost:3000/producto/eliminarDeseos/${idUsuario}/${idProducto}`
        return this.http.delete(url);
    }



}