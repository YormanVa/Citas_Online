import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Actividad,
  Perfil,
} from '../models';
import {ActividadRepository} from '../repositories';

export class ActividadPerfilController {
  constructor(
    @repository(ActividadRepository)
    public actividadRepository: ActividadRepository,
  ) { }

  @get('/actividads/{id}/perfil', {
    responses: {
      '200': {
        description: 'Perfil belonging to Actividad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async getPerfil(
    @param.path.string('id') id: typeof Actividad.prototype.id,
  ): Promise<Perfil> {
    return this.actividadRepository.perfil(id);
  }
}
