import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vendedor, VendedorRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly SusVentas: HasManyRepositoryFactory<Venta, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Vendedor, dataSource);
    this.SusVentas = this.createHasManyRepositoryFactoryFor('SusVentas', ventaRepositoryGetter,);
    this.registerInclusionResolver('SusVentas', this.SusVentas.inclusionResolver);
  }
}
