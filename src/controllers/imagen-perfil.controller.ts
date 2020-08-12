import { PerfilRepository } from './../repositories/perfil.repository';
import { authenticate } from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, del
} from '@loopback/rest';
import {
  Imagen,
  Perfil
} from '../models';
import {ImagenRepository} from '../repositories';

export class ImagenPerfilController {
  constructor(
    @repository(ImagenRepository)
    public imagenRepository: ImagenRepository,
  ) {}


  @get('/imagenes/{id}/perfil', {
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


  @del('/perfil-imagen/{id}', {
    responses: {
      '204': {
        description: 'Perfil Image DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') imageId: string): Promise<void> {
    await this.imagenRepository.deleteById(imageId);

  }
}
