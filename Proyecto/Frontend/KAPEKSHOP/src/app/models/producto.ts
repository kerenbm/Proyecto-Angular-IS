export class Producto{
    _id?: number;
    nombre: string;
    categoria:string;
    estado:string;
    descripcion:string;
    ubicacion:string;
    costo:string;


    constructor(nombre: string, categoria:string,estado:string,
        descripcion:string, ubicacion:string, costo:string){
        this.nombre=nombre;
        this.categoria=categoria;
        this.estado=estado;
        this.descripcion=descripcion;
        this.ubicacion=ubicacion;
        this.costo=costo;
        
    }
}