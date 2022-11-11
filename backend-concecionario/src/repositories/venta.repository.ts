import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Venta, VentaRelations, Vendedor, Vehiculo} from '../models';
import {VendedorRepository} from './vendedor.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly vendedor: BelongsToAccessor<Vendedor, typeof Venta.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Venta.prototype.id>;

  public readonly susVehiculosVendidos: HasManyRepositoryFactory<Vehiculo, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Venta, dataSource);
    this.susVehiculosVendidos = this.createHasManyRepositoryFactoryFor('susVehiculosVendidos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('susVehiculosVendidos', this.susVehiculosVendidos.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.vendedor = this.createBelongsToAccessorFor('vendedor', vendedorRepositoryGetter,);
    this.registerInclusionResolver('vendedor', this.vendedor.inclusionResolver);
  }
}
