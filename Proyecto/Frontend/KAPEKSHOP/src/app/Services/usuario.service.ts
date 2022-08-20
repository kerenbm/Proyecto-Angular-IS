import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import getHeaders from 'src/app/helpers/getHeaders'

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  url = 'http://localhost:3000/usuario/';

  constructor(private http:HttpClient, private router:Router) { }


  crearUsuario(objUsuario:any): Observable<any> {
    let urlStr = `http://localhost:3000/usuario/registro/`
      return this.http.post(urlStr, objUsuario)
  }
 
  eliminarUsuario(id:number){
    return this.http.delete(`http://localhost:3000/usuario/eliminar/${id}`);
  }

  loginUsuario(data:any): Observable<any> {
    return this.http.post('http://localhost:3000/usuario/login', data)
  }

  getUsuarios(): Observable<any>{
    const token = localStorage.getItem('token')
    const headers = getHeaders(token)
    return this.http.get(this.url, headers);
  }

  getUsuario(correo:string):Observable<any> {
    const token = localStorage.getItem('token')
    const headers = getHeaders(token)
    return this.http.get(`http://localhost:3000/usuario/${correo}`, headers)
  }

  obtenerUsuarioActual() {
    const token = localStorage.getItem('token') || '';
    const headers = getHeaders(token)
    const correo = helper.decodeToken(token).correo
    return this.http.get(`http://localhost:3000/usuario/${correo}`, headers);

  }

  guardarToken(token:any) {
    localStorage.setItem("token", token)
  }

  validarCorreo(token:any):Observable<any> {
    return this.http.put(`http://localhost:3000/usuario/registro/${token}`, {token});
  }

  validarTokenRecuperarContrasenia(token:any):Observable<any> {
    return this.http.get(`http://localhost:3000/usuario/recuperar-contrasenia/${token}`);
  }

  nuevaContrasenia(data:any):Observable<any> {
    return this.http.put(`http://localhost:3000/usuario/recuperar-contrasenia/nueva-contrasenia `, data);
  }

  recuperarContrasenia(correo:string):Observable<any> {
    return this.http.put(`http://localhost:3000/usuario/recuperar-contrasenia`, {correo});
  }

  nuevaCategoria(objCategoria:any): Observable<any> {
    return this.http.post(`http://localhost:3000/categoria/registro`, objCategoria);
  }

  obtenerCategorias(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = getHeaders(token)
    return this.http.get(`http://localhost:3000/categoria`, headers);
  }

  obtenerUsuarioPorId(idUsuario:any): Observable<any> {
    let url=`http://localhost:3000/usuario/obtenerUsuario/${idUsuario}`
    return this.http.get(url)
  }

}

