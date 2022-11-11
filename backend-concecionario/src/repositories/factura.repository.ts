import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Factura, FacturaRelations, Cliente, Venta} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VentaRepository} from './venta.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly suCliente: BelongsToAccessor<Cliente, typeof Factura.prototype.id>;

  public readonly SuFactura: BelongsToAccessor<Venta, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Factura, dataSource);
    this.SuFactura = this.createBelongsToAccessorFor('SuFactura', ventaRepositoryGetter,);
    this.registerInclusionResolver('SuFactura', this.SuFactura.inclusionResolver);
    this.suCliente = this.createBelongsToAccessorFor('suCliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('suCliente', this.suCliente.inclusionResolver);
  }
}
