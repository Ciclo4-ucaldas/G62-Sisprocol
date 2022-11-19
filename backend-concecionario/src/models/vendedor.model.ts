import {Entity, model, property, hasMany} from '@loopback/repository';
import { Usuario } from './usuario.model';
import {Venta} from './venta.model';

@model()
export class Vendedor extends Usuario {
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
  carnet: string;

  @hasMany(() => Venta)
  SusVentas: Venta[];

  constructor(data?: Partial<Vendedor>) {
    super(data);
  }
}

export interface VendedorRelations {
  // describe navigational properties here
}

export type VendedorWithRelations = Vendedor & VendedorRelations;
