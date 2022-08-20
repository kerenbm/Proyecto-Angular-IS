import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

const leerToken = () => {

    let token = localStorage.getItem('token');
    
    if( token ){

        const dec = helper.decodeToken(token)
        const tokenExpiro = helper.isTokenExpired(token); // helper
            //eliminar token
            
            if(tokenExpiro){
                localStorage.removeItem('token');
                
                
            }
        return dec
    }
    
    return false;
}

/*
function leerToken(){
    let token = localStorage.getItem('token');
    if( token ){
        const tokenExpiro = helper.isTokenExpired(token); // helper
        //eliminar token
        console.log(tokenExpiro);
        if(tokenExpiro){
            console.log(tokenExpiro);
            localStorage.removeItem(token);
            
        }
        return tokenExpiro ? false: true;
    }

    return false;

}*/


export default leerToken;
