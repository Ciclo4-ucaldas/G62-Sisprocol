import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Vendedor,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaVendedorController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Vendedor belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedor)},
          },
        },
      },
    },
  })
  async getVendedor(
    @param.path.string('id') id: typeof Venta.prototype.id,
  ): Promise<Vendedor> {
    return this.ventaRepository.vendedor(id);
  }
}
