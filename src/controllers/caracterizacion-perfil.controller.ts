import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Caracterizacion,
  Perfil,
} from '../models';
import {CaracterizacionRepository} from '../repositories';

export class CaracterizacionPerfilController {
  constructor(
    @repository(CaracterizacionRepository)
    public caracterizacionRepository: CaracterizacionRepository,
  ) { }

  @get('/caracterizacions/{id}/perfil', {
    responses: {
      '200': {
        description: 'Perfil belonging to Caracterizacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async getPerfil(
    @param.path.string('id') id: typeof Caracterizacion.prototype.id,
  ): Promise<Perfil> {
    return this.caracterizacionRepository.perfil(id);
  }
}
