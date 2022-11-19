import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Venta, Proveedor} from '../models';
import {VentaRepository} from './venta.repository';
import {ProveedorRepository} from './proveedor.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly VehVendidos: HasManyRepositoryFactory<Venta, typeof Vehiculo.prototype.id>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Vehiculo.prototype.id>;

  public readonly suProveedor: BelongsToAccessor<Proveedor, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.suProveedor = this.createBelongsToAccessorFor('suProveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('suProveedor', this.suProveedor.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.VehVendidos = this.createHasManyRepositoryFactoryFor('VehVendidos', ventaRepositoryGetter,);
    this.registerInclusionResolver('VehVendidos', this.VehVendidos.inclusionResolver);
  }
}
