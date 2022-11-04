import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConcesionarioCarrosDbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations} from '../models';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.Id,
  ProveedorRelations
> {
  constructor(
    @inject('datasources.Concesionario_CarrosDB') dataSource: ConcesionarioCarrosDbDataSource,
  ) {
    super(Proveedor, dataSource);
  }
}
