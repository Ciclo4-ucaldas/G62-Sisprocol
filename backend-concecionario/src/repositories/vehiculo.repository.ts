import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Proveedor} from '../models';
import {ProveedorRepository} from './proveedor.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly SuProveedor: BelongsToAccessor<Proveedor, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.SuProveedor = this.createBelongsToAccessorFor('SuProveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('SuProveedor', this.SuProveedor.inclusionResolver);
  }
}
