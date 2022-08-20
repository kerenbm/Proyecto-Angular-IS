import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
    providedIn: 'root'
})

export class MensajeService{
    emisorSocket:any;
    receptorSocket:any;
    mensajeActual:any=[];

    constructor(private http:HttpClient, private socketService: SocketService) {
        this.obtenerMensajes(this.emisorSocket,this.receptorSocket); //necesitamos que esté escuchando
    }

    crearMensaje(objMensaje:any): Observable<any> {
        let urlStr = `http://localhost:3000/mensaje/crearMensaje/`
        //emitir el mensaje al servidor
        this.socketService.io.emit('enviaMensaje', objMensaje)
        return this.http.post(urlStr, objMensaje)
    }

    obtenerMensajes(emisor_id:number, receptor_id:any): Observable<any> {
        let urlStr = `http://localhost:3000/mensaje/obtenerMensajes/${emisor_id}/${receptor_id}`
        //debemos saber cuando se recibe un mensaje
        this.emisorSocket = emisor_id;
        this.receptorSocket = receptor_id;
        
        this.socketService.io.on('recibeMensaje', (objetoMensaje)=>{
            
            this.mensajeActual = objetoMensaje;
        })
        console.log(this.mensajeActual)
        return this.http.get(urlStr)
        //return this.mensajeActual;
    }

    obtenerConversaciones(emisor_id:any): Observable<any>{
        let url = `http://localhost:3000/mensaje/conversaciones/${emisor_id}`;
        return this.http.get(url)
    }

}