import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Opinion,
  Perfil,
} from '../models';
import {OpinionRepository} from '../repositories';

export class OpinionPerfilController {
  constructor(
    @repository(OpinionRepository)
    public opinionRepository: OpinionRepository,
  ) { }

  @get('/opinions/{id}/perfil', {
    responses: {
      '200': {
        description: 'Perfil belonging to Opinion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async getPerfil(
    @param.path.string('id') id: typeof Opinion.prototype.id,
  ): Promise<Perfil> {
    return this.opinionRepository.perfil(id);
  }
}
