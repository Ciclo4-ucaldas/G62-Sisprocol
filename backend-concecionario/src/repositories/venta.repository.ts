import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Venta, VentaRelations, Vendedor} from '../models';
import {VendedorRepository} from './vendedor.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly vendedor: BelongsToAccessor<Vendedor, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>,
  ) {
    super(Venta, dataSource);
    this.vendedor = this.createBelongsToAccessorFor('vendedor', vendedorRepositoryGetter,);
    this.registerInclusionResolver('vendedor', this.vendedor.inclusionResolver);
  }
}
