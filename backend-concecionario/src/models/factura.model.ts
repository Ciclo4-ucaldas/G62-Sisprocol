import { authenticate } from '@loopback/authentication';
import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Venta} from './venta.model';

@model()


export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Cliente, {name: 'suCliente'})
  clienteId: string;

  @belongsTo(() => Venta, {name: 'SuFactura'})
  ventaId: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
