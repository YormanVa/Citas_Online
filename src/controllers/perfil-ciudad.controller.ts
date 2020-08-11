import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Perfil,
  Ciudad,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilCiudadController {
  constructor(
    @repository(PerfilRepository)
    public perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Perfil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Perfil.prototype.id,
  ): Promise<Ciudad> {
    return this.perfilRepository.ciudad(id);
  }
}
