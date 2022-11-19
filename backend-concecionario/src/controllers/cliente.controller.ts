import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
import { AutenticacionService, NotificacionService } from '../services';

const fetch=require("node-fetch");

export class ClienteController {
  
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService
  ) { }

  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {

    //let clave = this.servicioAutenticacion.GenerarClave();//Nos provee el servicio de generación de clave. claven texto plano
    //let claveCifrada = this.servicioAutenticacion.CifrarClave(clave); //Tenemos la clave cifrada.
    let clave = this.servicioNotificacion.GenerarClave();
    let claveCifrada = this.servicioNotificacion.CifrarClave(clave);
    cliente.contrasena = claveCifrada;//A la persona que llega le debemos asignar a la clave esa clave cifrada. dificil leer en BD
    let client = this.clienteRepository.create(cliente)
    let asunto = "Registro en plataforma como Cliente"
    let mensaje = "Bienvenido a nuestra plataforma"+cliente.nombres+""+cliente.apellidos+" su clave temporal es: "+cliente.contrasena+" y su usuario es: "+cliente.correo;
    let enviadoEmail = this.servicioNotificacion.notificacionEmail(cliente.correo, asunto, mensaje);
    let enviadoSms = this.servicioNotificacion.notificacionSms(cliente.telefono, mensaje);
    if(enviadoEmail&&enviadoSms){
      return cliente
    }else{
      return new HttpErrors[500]("No se pudo crear el cliente")
    }
   

    //Notificamos al usuario. Anteriormente lo haciamos via email desde python ?
    //Abrimos nuestro IDE de (Anaconda -- Spyder)

    /*let destino = cliente.correo;
    let asunto = 'Registro en la plataforma';
    let contenido = `Hola ${cliente.nombres}, su nombre de usuario es: ${cliente.correo} y su contraseña es: ${clave}`;
    fetch(`http://127.0.0.1:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    return p;*/

  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}


