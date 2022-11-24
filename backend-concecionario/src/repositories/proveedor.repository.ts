import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly susVehiculos: HasManyRepositoryFactory<Vehiculo, typeof Proveedor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Proveedor, dataSource);
    this.susVehiculos = this.createHasManyRepositoryFactoryFor('susVehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('susVehiculos', this.susVehiculos.inclusionResolver);
  }
}
