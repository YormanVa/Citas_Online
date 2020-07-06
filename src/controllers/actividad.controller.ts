import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Actividad} from '../models';
import {ActividadRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

export class ActividadController {
  constructor(
    @repository(ActividadRepository)
    public actividadRepository : ActividadRepository,
  ) {}

  @authenticate('TokenPerfilStrategy')
  @post('/actividad', {
    responses: {
      '200': {
        description: 'Actividad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Actividad)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actividad, {
            title: 'NewActividad',
            exclude: ['id'],
          }),
        },
      },
    })
    actividad: Omit<Actividad, 'id'>,
  ): Promise<Actividad> {
    return this.actividadRepository.create(actividad);
  }

  @authenticate('TokenPerfikStrategy')
  @get('/actividad/count', {
    responses: {
      '200': {
        description: 'Actividad model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Actividad) where?: Where<Actividad>,
  ): Promise<Count> {
    return this.actividadRepository.count(where);
  }
  
  @get('/actividad', {
    responses: {
      '200': {
        description: 'Array of Actividad model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Actividad, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Actividad) filter?: Filter<Actividad>,
  ): Promise<Actividad[]> {
    return this.actividadRepository.find(filter);
  }

  @patch('/actividad', {
    responses: {
      '200': {
        description: 'Actividad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actividad, {partial: true}),
        },
      },
    })
    actividad: Actividad,
    @param.where(Actividad) where?: Where<Actividad>,
  ): Promise<Count> {
    return this.actividadRepository.updateAll(actividad, where);
  }

  @get('/actividad/{id}', {
    responses: {
      '200': {
        description: 'Actividad model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Actividad, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Actividad, {exclude: 'where'}) filter?: FilterExcludingWhere<Actividad>
  ): Promise<Actividad> {
    return this.actividadRepository.findById(id, filter);
  }

  @patch('/actividad/{id}', {
    responses: {
      '204': {
        description: 'Actividad PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actividad, {partial: true}),
        },
      },
    })
    actividad: Actividad,
  ): Promise<void> {
    await this.actividadRepository.updateById(id, actividad);
  }

  @put('/actividad/{id}', {
    responses: {
      '204': {
        description: 'Actividad PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() actividad: Actividad,
  ): Promise<void> {
    await this.actividadRepository.replaceById(id, actividad);
  }

  @del('/actividad/{id}', {
    responses: {
      '204': {
        description: 'Actividad DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.actividadRepository.deleteById(id);
  }
}
