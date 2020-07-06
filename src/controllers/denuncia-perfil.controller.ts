import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Denuncia,
  Perfil,
} from '../models';
import {DenunciaRepository} from '../repositories';

export class DenunciaPerfilController {
  constructor(
    @repository(DenunciaRepository)
    public denunciaRepository: DenunciaRepository,
  ) { }

  @get('/denuncias/{id}/perfil', {
    responses: {
      '200': {
        description: 'Perfil belonging to Denuncia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async getPerfil(
    @param.path.string('id') id: typeof Denuncia.prototype.id,
  ): Promise<Perfil> {
    return this.denunciaRepository.perfil(id);
  }
}
