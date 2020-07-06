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
  Ubicacion,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilUbicacionController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/ubicacion', {
    responses: {
      '200': {
        description: 'Perfil has one Ubicacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ubicacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ubicacion>,
  ): Promise<Ubicacion> {
    return this.perfilRepository.ubicacion(id).get(filter);
  }

  @post('/perfils/{id}/ubicacion', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ubicacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ubicacion, {
            title: 'NewUbicacionInPerfil',
            exclude: ['id'],
            optional: ['perfilId']
          }),
        },
      },
    }) ubicacion: Omit<Ubicacion, 'id'>,
  ): Promise<Ubicacion> {
    return this.perfilRepository.ubicacion(id).create(ubicacion);
  }

  @patch('/perfils/{id}/ubicacion', {
    responses: {
      '200': {
        description: 'Perfil.Ubicacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ubicacion, {partial: true}),
        },
      },
    })
    ubicacion: Partial<Ubicacion>,
    @param.query.object('where', getWhereSchemaFor(Ubicacion)) where?: Where<Ubicacion>,
  ): Promise<Count> {
    return this.perfilRepository.ubicacion(id).patch(ubicacion, where);
  }

  @del('/perfils/{id}/ubicacion', {
    responses: {
      '200': {
        description: 'Perfil.Ubicacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ubicacion)) where?: Where<Ubicacion>,
  ): Promise<Count> {
    return this.perfilRepository.ubicacion(id).delete(where);
  }
}
