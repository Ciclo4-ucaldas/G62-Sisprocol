import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConcesionarioCarrosDbDataSource} from '../datasources';
import {Mecanico, MecanicoRelations} from '../models';

export class MecanicoRepository extends DefaultCrudRepository<
  Mecanico,
  typeof Mecanico.prototype.Id,
  MecanicoRelations
> {
  constructor(
    @inject('datasources.Concesionario_CarrosDB') dataSource: ConcesionarioCarrosDbDataSource,
  ) {
    super(Mecanico, dataSource);
  }
}
