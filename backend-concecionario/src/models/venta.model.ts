import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Vendedor} from './vendedor.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Venta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  subtotal: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Vendedor)
  vendedorId: string;

  @hasMany(() => Vehiculo)
  susVehiculosVendidos: Vehiculo[];

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
