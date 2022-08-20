import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import getHeaders from '../helpers/getHeaders';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }
  crearProducto(objUsuario:any): Observable<any> {
    let urlStr = `http://localhost:3000/producto/registro/`
      return this.http.post(urlStr, objUsuario)
  }

  getProductos(): Observable<any>{
    let url = 'http://localhost:3000/producto/';
    return this.http.get(url);
  }

  actualizarContador(id:any): Observable<any>{
    let url = `http://localhost:3000/producto/contador/${id}`;
    return this.http.put(url, {contador:1});
  }

  obtenerProductoActual(id:any) {
    const token = localStorage.getItem('token') || '';
    const headers = getHeaders(token)
    return this.http.get(`http://localhost:3000/producto/${id}`, headers);
  }

  obtenerPorId(idProducto:number):Observable<any>{
    let url = `http://localhost:3000/producto/detalle/${idProducto}`;
    return this.http.get(url)
  }

  getProductoPorCategoria(id: any): Observable<any>{
    let url = `http://localhost:3000/producto/${id}`;
    return this.http.get(url);
  }

  filtrarProductos(filtro: any, valor: any, objProductos: any): Observable<any> {
    console.log(objProductos)
    console.log(filtro)
    console.log(valor)
    let url = `http://localhost:3000/producto/filtrarProductos/${filtro}/${valor}`;
    return this.http.get(url, objProductos);
  }

  /*-----------------------------Metodos UPDATE-----------------------------*/
  editarProducto(id: any, objProducto: any): Observable<any>{
    let url = `http://localhost:3000/producto/actualizar/${id}`;
    return this.http.put(url, objProducto);
  }
  /*-----------------------------Metodos DELETE-----------------------------*/
  eliminarProducto(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/producto/${id}`);
  }

  subirImagenProducto(idProducto:number, imagen:any): Observable<any>{
    let url = `http://localhost:3000/producto/subir-imagen/`;
    return this.http.post(url, {idProducto, imagen});
  }

  obtenerImagenesProducto(idProducto:number): Observable<any>{
    let url = `http://localhost:3000/producto/imagenes/${idProducto}`;
    console.log(url)
    return this.http.get(url);
  }

  actualizarCalificacion(idProducto:number, idUsuario:number, calificacion:number):Observable<any> {
    let url = `http://localhost:3000/producto/calificar/`;
    return this.http.post(url,{idProducto, idUsuario, calificacion} );
  }
  obtenerCalificacionUsuarioProducto(idProducto:number, idUsuario:number):Observable<any> {
    let url = `http://localhost:3000/producto/calificar/obtener-calificacion/${idProducto}/${idUsuario}`;
    return this.http.get(url );
  }
  obtenerCalificacionProducto(idProducto:number):Observable<any> {
    let url = `http://localhost:3000/producto/calificar/obtener-calificacion/${idProducto}`;
    return this.http.get(url );
  }
  denunciaProducto(idProducto:number, objetoDenuncia:any){
    let url=`http://localhost:3000/producto/denuncia/${idProducto}`;
    return this.http.post(url,objetoDenuncia);
  }

  obtenerDenuncias(): Observable<any>{
    let url = `http://localhost:3000/producto/denuncia/obtenerDenuncias`;
    return this.http.get(url)
  }

  eliminarDenuncia(id:number): Observable<any>{
    let url=`http://localhost:3000/producto/denuncia/eliminar/${id}`;
    return this.http.delete(url)
  }

  obtenerProductosMasVisitados(): Observable<any> {
    let url = `http://localhost:3000/producto/mas-visitados`;
    return this.http.get(url);
  }

  obtenerCategoriasMasVisitadas(): Observable<any> {
    let url = `http://localhost:3000/producto/categorias-mas-visitadas`;
    return this.http.get(url);
  }

  obtenerProductosMasVisitadosPorDepartamento(): Observable<any> {
    let url = `http://localhost:3000/producto/mas-visitados-departamento`;
    return this.http.get(url);
  }

  obtenerAnuncios(): Observable<any>{
    let url = `http://localhost:3000/producto/obtenerAnuncios/`;
    return this.http.get(url)
  }

  eliminarAnuncio(idProducto:any, idUsuario:any): Observable<any>{
    let url=`http://localhost:3000/producto/eliminarAnuncio/${idProducto}/${idUsuario}`;
    return this.http.delete(url)
  }

  departamentoGrafico(): Observable<any>{
    let url=`http://localhost:3000/producto/graficoDepartamentos`
    return this.http.get(url)
  }

  
}

