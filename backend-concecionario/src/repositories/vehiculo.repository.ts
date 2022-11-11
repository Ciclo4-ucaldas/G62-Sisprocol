import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly VehVendidos: HasManyRepositoryFactory<Venta, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.VehVendidos = this.createHasManyRepositoryFactoryFor('VehVendidos', ventaRepositoryGetter,);
    this.registerInclusionResolver('VehVendidos', this.VehVendidos.inclusionResolver);
  }
}
