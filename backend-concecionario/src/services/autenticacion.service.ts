import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Cliente, Usuario, Vendedor} from '../models';
import {ClienteRepository, VendedorRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(VendedorRepository)
    public vendedorRepository: VendedorRepository,
    @repository(ClienteRepository)
    public ClienteRepository: ClienteRepository
  ) { }//Así podemos acceder a los metódos del repositorio.

  /*
   GenerarClave() --> invoca al generador def. linia2. para que nos cree
   una contraseña aleatoria.
   
  GenerarClave() {
    let contrasena = generador(8, false);
    return contrasena;
  }
  //Creamos el metodo que nos permita cifrar la clave.

  /*CifrarClave(contrasena: string) {//Acá importamos nuestro paquete.
    let claveCifrada = cryptoJS.MD5(contrasena).toString();//MD5 --> metódo de cifrado.
    return claveCifrada;
  }*/

  /*IdentificarPersona(usuario: string, clave: string) {//Con esto accedemos a la BD
    try {//ubicamos a la persona que corresponda a ese logueo. El acceso a la Bd se hace a traves de un repositorio.
      let p = this.PersonaRepository.findOne({where: {correo: usuario, clave: clave}})//Comparamos los datos que llegan con los la BD.
      if (p) {
        return p;
      }
    } catch {
      return false;

    }
  }*/

  GenerarTokenJWT(usuario: Usuario) {//Recibe una persona ya definida.
    //INSTALAMOS EL PAQUETE TOKEN --- y LO IMPORTAMOS ARRIVA  const....
    let rol= "";
    let client = await this.ClienteRepository.findOne({where:{correo:usuario.correo, contrasena:usuario.contrasena}})
    if (client){
      rol=client.constructor.name
    }
    if (rol!=""){
      if (Vendedor){
        let vende = await this.vendedorRepository.findOne({where:{correo:usuario.correo, contrasena:usuario.contrasena}})
        rol= vende.constructor.name
      }  
    }  

    let token = jwt.sign({//Fecha de expiración no tiene.
      data: {
        id: usuario.id,//Este id pertenece al id que se tiene en la base de datos.
        correo: usuario.correo,
        nombre: usuario.nombres + " " + usuario.apellidos,
        rol : rol

      }
    },
      Llaves.claveJWT
      )
    return token;

  }
  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch (error){
      console.log (error)
      return false;
    }

  }

}

