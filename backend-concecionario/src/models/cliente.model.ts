import {model, property, hasMany} from '@loopback/repository';
import {Usuario} from '.';
import {Factura} from './factura.model';

@model()
export class Cliente extends Usuario {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @hasMany(() => Factura)
  susFacturas: Factura[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
