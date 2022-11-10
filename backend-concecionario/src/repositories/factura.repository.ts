import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly suCliente: BelongsToAccessor<Cliente, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Factura, dataSource);
    this.suCliente = this.createBelongsToAccessorFor('suCliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('suCliente', this.suCliente.inclusionResolver);
  }
}
