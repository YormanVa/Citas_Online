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
import {EstadoCivil} from '../models';
import {EstadoCivilRepository} from '../repositories';

export class EstadoCivilController {
  constructor(
    @repository(EstadoCivilRepository)
    public estadoCivilRepository : EstadoCivilRepository,
  ) {}

  @post('/estado-civil', {
    responses: {
      '200': {
        description: 'EstadoCivil model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstadoCivil)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoCivil, {
            title: 'NewEstadoCivil',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoCivil: Omit<EstadoCivil, 'id'>,
  ): Promise<EstadoCivil> {
    return this.estadoCivilRepository.create(estadoCivil);
  }

  @get('/estado-civil/count', {
    responses: {
      '200': {
        description: 'EstadoCivil model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EstadoCivil) where?: Where<EstadoCivil>,
  ): Promise<Count> {
    return this.estadoCivilRepository.count(where);
  }

  @get('/estado-civil', {
    responses: {
      '200': {
        description: 'Array of EstadoCivil model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EstadoCivil, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EstadoCivil) filter?: Filter<EstadoCivil>,
  ): Promise<EstadoCivil[]> {
    return this.estadoCivilRepository.find(filter);
  }

  @patch('/estado-civil', {
    responses: {
      '200': {
        description: 'EstadoCivil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoCivil, {partial: true}),
        },
      },
    })
    estadoCivil: EstadoCivil,
    @param.where(EstadoCivil) where?: Where<EstadoCivil>,
  ): Promise<Count> {
    return this.estadoCivilRepository.updateAll(estadoCivil, where);
  }

  @get('/estado-civil/{id}', {
    responses: {
      '200': {
        description: 'EstadoCivil model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EstadoCivil, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstadoCivil, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoCivil>
  ): Promise<EstadoCivil> {
    return this.estadoCivilRepository.findById(id, filter);
  }

  @patch('/estado-civil/{id}', {
    responses: {
      '204': {
        description: 'EstadoCivil PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoCivil, {partial: true}),
        },
      },
    })
    estadoCivil: EstadoCivil,
  ): Promise<void> {
    await this.estadoCivilRepository.updateById(id, estadoCivil);
  }

  @put('/estado-civil/{id}', {
    responses: {
      '204': {
        description: 'EstadoCivil PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadoCivil: EstadoCivil,
  ): Promise<void> {
    await this.estadoCivilRepository.replaceById(id, estadoCivil);
  }

  @del('/estado-civil/{id}', {
    responses: {
      '204': {
        description: 'EstadoCivil DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadoCivilRepository.deleteById(id);
  }
}
