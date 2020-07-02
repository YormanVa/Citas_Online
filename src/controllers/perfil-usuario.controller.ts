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
  Usuario,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilUsuarioController {
  constructor(
    @repository(PerfilRepository)
    public perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Perfil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Perfil.prototype.id,
  ): Promise<Usuario> {
    return this.perfilRepository.usuario(id);
  }
}
