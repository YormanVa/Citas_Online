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
  Caracterizacion,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilCaracterizacionController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/caracterizacions', {
    responses: {
      '200': {
        description: 'Array of Perfil has many Caracterizacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Caracterizacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Caracterizacion>,
  ): Promise<Caracterizacion[]> {
    return this.perfilRepository.caracterizaciones(id).find(filter);
  }

  @post('/perfils/{id}/caracterizacions', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Caracterizacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caracterizacion, {
            title: 'NewCaracterizacionInPerfil',
            exclude: ['id'],
            optional: ['perfilId']
          }),
        },
      },
    }) caracterizacion: Omit<Caracterizacion, 'id'>,
  ): Promise<Caracterizacion> {
    return this.perfilRepository.caracterizaciones(id).create(caracterizacion);
  }

  @patch('/perfils/{id}/caracterizacions', {
    responses: {
      '200': {
        description: 'Perfil.Caracterizacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Caracterizacion, {partial: true}),
        },
      },
    })
    caracterizacion: Partial<Caracterizacion>,
    @param.query.object('where', getWhereSchemaFor(Caracterizacion)) where?: Where<Caracterizacion>,
  ): Promise<Count> {
    return this.perfilRepository.caracterizaciones(id).patch(caracterizacion, where);
  }

  @del('/perfils/{id}/caracterizacions', {
    responses: {
      '200': {
        description: 'Perfil.Caracterizacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Caracterizacion)) where?: Where<Caracterizacion>,
  ): Promise<Count> {
    return this.perfilRepository.caracterizaciones(id).delete(where);
  }
}
