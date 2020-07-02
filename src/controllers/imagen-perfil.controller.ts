import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Imagen,
  Perfil,
} from '../models';
import {ImagenRepository} from '../repositories';

export class ImagenPerfilController {
  constructor(
    @repository(ImagenRepository)
    public imagenRepository: ImagenRepository,
  ) { }

  @get('/imagens/{id}/perfil', {
    responses: {
      '200': {
        description: 'Perfil belonging to Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async getPerfil(
    @param.path.string('id') id: typeof Imagen.prototype.id,
  ): Promise<Perfil> {
    return this.imagenRepository.perfil(id);
  }
}
