import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConcesionarioCarrosDbDataSource} from '../datasources';
import {Cliente, ClienteRelations} from '../models';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.Id,
  ClienteRelations
> {
  constructor(
    @inject('datasources.Concesionario_CarrosDB') dataSource: ConcesionarioCarrosDbDataSource,
  ) {
    super(Cliente, dataSource);
  }
}
