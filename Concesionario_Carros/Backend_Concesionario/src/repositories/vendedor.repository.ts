import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConcesionarioCarrosDbDataSource} from '../datasources';
import {Vendedor, VendedorRelations} from '../models';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.Id,
  VendedorRelations
> {
  constructor(
    @inject('datasources.Concesionario_CarrosDB') dataSource: ConcesionarioCarrosDbDataSource,
  ) {
    super(Vendedor, dataSource);
  }
}
