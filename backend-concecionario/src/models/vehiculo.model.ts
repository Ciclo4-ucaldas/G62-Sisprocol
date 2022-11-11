import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Venta} from './venta.model';
import {Proveedor} from './proveedor.model';

@model()
export class Vehiculo extends Entity {
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
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  SerieChasis: string;

  @property({
    type: 'string',
    required: true,
  })
  SerieMotor: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  existencia: number;

  @hasMany(() => Venta)
  VehVendidos: Venta[];

  @belongsTo(() => Proveedor)
  proveedorId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
