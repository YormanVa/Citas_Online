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
  Actividad,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilActividadController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/actividads', {
    responses: {
      '200': {
        description: 'Array of Perfil has many Actividad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Actividad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Actividad>,
  ): Promise<Actividad[]> {
    return this.perfilRepository.actividades(id).find(filter);
  }

  @post('/perfils/{id}/actividads', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Actividad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actividad, {
            title: 'NewActividadInPerfil',
            exclude: ['id'],
            optional: ['perfilId']
          }),
        },
      },
    }) actividad: Omit<Actividad, 'id'>,
  ): Promise<Actividad> {
    return this.perfilRepository.actividades(id).create(actividad);
  }

  @patch('/perfils/{id}/actividads', {
    responses: {
      '200': {
        description: 'Perfil.Actividad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actividad, {partial: true}),
        },
      },
    })
    actividad: Partial<Actividad>,
    @param.query.object('where', getWhereSchemaFor(Actividad)) where?: Where<Actividad>,
  ): Promise<Count> {
    return this.perfilRepository.actividades(id).patch(actividad, where);
  }

  @del('/perfils/{id}/actividads', {
    responses: {
      '200': {
        description: 'Perfil.Actividad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Actividad)) where?: Where<Actividad>,
  ): Promise<Count> {
    return this.perfilRepository.actividades(id).delete(where);
  }
}
