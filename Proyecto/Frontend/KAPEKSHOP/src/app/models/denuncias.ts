export class Denuncias{
    _id?: number;
    opcion: string;
    razon: string;
    otros: string;


    
    constructor(opcion: string, razon: string, otros: string){
     this.opcion=opcion;
     this.razon=razon;
     this.otros=otros;   
    }



}