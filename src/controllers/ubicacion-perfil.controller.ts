import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ubicacion,
  Perfil,
} from '../models';
import {UbicacionRepository} from '../repositories';

export class UbicacionPerfilController {
  constructor(
    @repository(UbicacionRepository)
    public ubicacionRepository: UbicacionRepository,
  ) { }

  @get('/ubicacions/{id}/perfil', {
    responses: {
      '200': {
        description: 'Perfil belonging to Ubicacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async getPerfil(
    @param.path.string('id') id: typeof Ubicacion.prototype.id,
  ): Promise<Perfil> {
    return this.ubicacionRepository.perfil(id);
  }
}
