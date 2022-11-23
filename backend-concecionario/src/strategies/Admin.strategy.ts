import {AuthenticationStrategy} from "@loopback/authentication";
import {service } from "@loopback/core";
import { HttpErrors, RedirectRoute, Request } from "@loopback/rest";
import {UserProfile} from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";

export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string = "admin";
    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ){}
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request);
        if(token){
            let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
            if(datos.data.rol=="Administrador"){
                let perfil: UserProfile=Object.assign(
                    {
                        nombre: datos.data.nombres,
                        rol: datos.dat.rol
                    }
                )
                return perfil;
            }else{
                throw new HttpErrors[401]("Token no válido")
            }
        }else{
            throw new HttpErrors[401]("No se envio un token en la solicitud")
        }
    }
    async authenticacion (){
        
    }
}
