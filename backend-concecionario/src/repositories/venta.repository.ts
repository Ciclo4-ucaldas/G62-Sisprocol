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

  public readonly SuVendedor: BelongsToAccessor<Vendedor, typeof Venta.prototype.id>;

  public readonly SusVehiculos: HasManyRepositoryFactory<Vehiculo, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Venta, dataSource);
    this.SusVehiculos = this.createHasManyRepositoryFactoryFor('SusVehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('SusVehiculos', this.SusVehiculos.inclusionResolver);
    this.SuVendedor = this.createBelongsToAccessorFor('SuVendedor', vendedorRepositoryGetter,);
    this.registerInclusionResolver('SuVendedor', this.SuVendedor.inclusionResolver);
  }
}
