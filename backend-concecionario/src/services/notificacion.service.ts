import {injectable, /* inject, */ BindingScope} from '@loopback/core';

const generator = require ("password-generator");
const cryptoJS = require("crypto-js");
const fetch = require("node-fetch")

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  GenerarClave() {
    let contrasena = generator(8, false);
    return contrasena;
  }

  CifrarClave(contrasena: string) {//Acá importamos nuestro paquete.
    let claveCifrada = cryptoJS.MD5(contrasena).toString();//MD5 --> metódo de cifrado.
    return claveCifrada;
  }

  notificacionEmail(destino:string, asunto:string, mensaje:string){
    fetch(`http://127.0.0.1:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`)
    .then((data:any) => {
      console.log(data);
      }).catch((error:any)=>{
        console.log(error)
      })
  }  

  notificacionSms(destino:string, mensaje:string){
    fetch(`http://127.0.0.1:5000/sms?telefono${destino}&mensaje=${mensaje}`)
    .then((data:any) => {
      console.log(data);
      }).catch((error:any)=>{
        console.log(error)
      })
  }
}
