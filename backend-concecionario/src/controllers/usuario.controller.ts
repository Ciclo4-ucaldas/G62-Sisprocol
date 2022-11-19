import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Credencial, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import { AutenticacionService } from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {}

  @post("/identificarUsuario",{
    responses:{
     '200':{
       description:"Identificacion de usuario"
     }
    }
   }
   )
   async identificarUsuario(@requestBody() credencial:Credencial){
     let usuario=await this.servicioAutenticacion.IdentificarPersona(credencial.usuario,credencial.clave)
     let token;
     if(usuario){
        token =await this.servicioAutenticacion.GenerarTokenJWT(usuario,usuario.constructor.name);
       return{
         datos:{
           nombres:usuario.nombres,
           correo:usuario.correo,
           id:usuario.id,
           rol:usuario.constructor.name
         },
         tk:token
       }
     }else {
       throw new HttpErrors[401]("datos invalidos")
     }
   }
}
