import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConcesionarioCarrosDbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations} from '../models';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.Id,
  VehiculoRelations
> {
  constructor(
    @inject('datasources.Concesionario_CarrosDB') dataSource: ConcesionarioCarrosDbDataSource,
  ) {
    super(Vehiculo, dataSource);
  }
}
