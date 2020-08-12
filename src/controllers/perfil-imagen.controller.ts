import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Perfil,
  Imagen,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilImagenController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfiles/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Array of Perfil has many Imagen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Imagen)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Imagen>,
  ): Promise<Imagen[]> {
    return this.perfilRepository.imagenes(id).find(filter);
  }

  @authenticate('TokenBasicStrategy')
  @post('/perfiles/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imagen)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {
            title: 'NewImagenInPerfil',
            exclude: ['id'],
            optional: ['perfilId']
          }),
        },
      },
    }) imagen: Omit<Imagen, 'id'>,
  ): Promise<Imagen> {
    return this.perfilRepository.imagenes(id).create(imagen);
  }

  @patch('/perfiles/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Perfil.Imagen PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagen, {partial: true}),
        },
      },
    })
    imagen: Partial<Imagen>,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.perfilRepository.imagenes(id).patch(imagen, where);
  }
  @authenticate('TokenBasicStrategy')
  @del('/perfiles/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Perfil.Imagen DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Imagen)) where?: Where<Imagen>,
  ): Promise<Count> {
    return this.perfilRepository.imagenes(id).delete(where);
  }

  
}
