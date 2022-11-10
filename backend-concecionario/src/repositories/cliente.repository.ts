import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly susFacturas: HasManyRepositoryFactory<Factura, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Cliente, dataSource);
    this.susFacturas = this.createHasManyRepositoryFactoryFor('susFacturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('susFacturas', this.susFacturas.inclusionResolver);
  }
}
