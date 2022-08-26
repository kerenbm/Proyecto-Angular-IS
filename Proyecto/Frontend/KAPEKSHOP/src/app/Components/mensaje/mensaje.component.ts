import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { MensajeService } from 'src/app/Services/mensajes.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {


  nuevoMensaje:string="";
  chat_activo=false;
  usuarioActual:any;
  idUsuarioChat:any;
  usuarioChat:any;
  usuariosConversacion:any=[]
  receptor_seleccionado: Usuario |undefined;
  mensajes:any=[];
  conversaciones:any=[];
  mensajeActual:any=[]

  constructor(private route: ActivatedRoute,private usuarioService: UsuarioService, private mensajeService: MensajeService) {

   }

  ngOnInit(): void {
    this.idUsuarioChat = parseInt(this.route.snapshot.paramMap.get('idUsuario') || "")
    this.obtenerUsuarioActual()
    this.obtenerConversaciones()
    //this.obtenerMensajes()
    //this.obtenerUsuarioChat()
  }

  enviarMensaje(){
    console.log(this.nuevoMensaje)
    let mensaje = {
      emisor: this.usuarioActual.idUsuario,
      receptor: this.receptor_seleccionado?.idUsuario || this.idUsuarioChat,
      texto: this.nuevoMensaje
    }
    this.mensajeService.crearMensaje(mensaje).subscribe(res=>{
      console.log(res)
      this.obtenerMensajes();
      this.obtenerUsuarioChat();
    },err =>{
      console.log(err)
    })
    this.nuevoMensaje=" ";
    //obtenerMensajes
    setTimeout(()=>{
      this.mensajesScrollFinal();
    },30);
   
  }

  seleccionarDestinatario(event:any){
    this.receptor_seleccionado= event;
    //this.receptor_seleccionado = this.idUsuarioChat;
    //MANDAMOS A LLAMAR LOS MENSAJES YA QUE AQUÍ ES CUANDO ABRIMOS EL CHAT CON 'X' USUARIO
    console.log(this.receptor_seleccionado?.idUsuario)
    this.chat_activo = true;

    this.mensajeService.obtenerMensajes(this.usuarioActual.idUsuario, this.receptor_seleccionado?.idUsuario || this.idUsuarioChat).subscribe(res=>{
      this.mensajes = res
      console.log(res)
    })
    //console.log(event.idUsuario)
  }

  obtenerUsuarioActual(){
    this.usuarioService.obtenerUsuarioActual().subscribe(res=>{
      this.usuarioActual = res;
      console.log(res)
      this.obtenerMensajes()
      this.obtenerUsuarioChat()
      this.obtenerConversaciones()
    })
  }

  obtenerMensajes(){
    
    this.mensajeService.obtenerMensajes(this.usuarioActual.idUsuario, this.receptor_seleccionado?.idUsuario || this.idUsuarioChat).subscribe(res=>{
      this.mensajes = res
      console.log(res)
      /*
      setTimeout(()=>{
        this.mensajesScrollFinal();
      },30);*/
      
    })
    

    
  }
  

  //PARA HACER SCROLL EN LOS MENSAJES AUTOMATICAMENTE
  mensajesScrollFinal(){
    let elements = document.getElementsByClassName('msj'); //Aqui obtenemos todos los elemntos de mensajes, la clase en el HTML
    let ultimoE:any= elements[elements.length-1];
    let toppos = ultimoE.offsetTop;

    //@ts-ignore
    document.getElementById('contenedorMensajes')?.scrollTop = toppos;
  }

  obtenerUsuarioChat(){
    this.usuarioService.obtenerUsuarioPorId(this.idUsuarioChat).subscribe(res=>{
      this.usuarioChat = res;
      console.log(res[0].nombre)
    },err=>{
      console.log(err)
    })
  }

  //obtengo las conversaciones
  obtenerConversaciones(){
    this.mensajeService.obtenerConversaciones(this.usuarioActual.idUsuario).subscribe(res=>{
      this.conversaciones = res;
      console.log(res)
      //HACER LA COMPARACION Y NO ENVIAR EL ID DEL USUARIO ACTUAL, SOLO LOS RESTANTES
      for(let i=0;i<res.length;i++){
        console.log(res[i])
        if((res[i].usuario1_id != this.usuarioActual.idUsuario)){
          this.usuarioService.obtenerUsuarioPorId(res[i].usuario1_id).subscribe(res=>{
            this.usuariosConversacion.push(res[0]); 
          })
          console.log('usuario1 difrente')
        }else{
          this.usuarioService.obtenerUsuarioPorId(res[i].usuario2_id).subscribe(res=>{
            this.usuariosConversacion.push(res[0]);  
          })
          console.log('usuario2 diferente')
        }
      }
      console.log(this.usuariosConversacion)

    })

  }
  
  
}
