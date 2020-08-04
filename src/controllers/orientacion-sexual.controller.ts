import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {OrientacionSexual} from '../models';
import {OrientacionSexualRepository} from '../repositories';

export class OrientacionSexualController {
  constructor(
    @repository(OrientacionSexualRepository)
    public orientacionSexualRepository: OrientacionSexualRepository,
  ) {}

  @post('/orientacion-sexual', {
    responses: {
      '200': {
        description: 'OrientacionSexual model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrientacionSexual)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrientacionSexual, {
            title: 'NewOrientacionSexual',
            exclude: ['id'],
          }),
        },
      },
    })
    orientacionSexual: Omit<OrientacionSexual, 'id'>,
  ): Promise<OrientacionSexual> {
    return this.orientacionSexualRepository.create(orientacionSexual);
  }

  @get('/orientacion-sexual/count', {
    responses: {
      '200': {
        description: 'OrientacionSexual model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(OrientacionSexual) where?: Where<OrientacionSexual>,
  ): Promise<Count> {
    return this.orientacionSexualRepository.count(where);
  }

  @get('/orientacion-sexual', {
    responses: {
      '200': {
        description: 'Array of OrientacionSexual model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OrientacionSexual, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OrientacionSexual) filter?: Filter<OrientacionSexual>,
  ): Promise<OrientacionSexual[]> {
    return this.orientacionSexualRepository.find(filter);
  }

  @patch('/orientacion-sexual', {
    responses: {
      '200': {
        description: 'OrientacionSexual PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrientacionSexual, {partial: true}),
        },
      },
    })
    orientacionSexual: OrientacionSexual,
    @param.where(OrientacionSexual) where?: Where<OrientacionSexual>,
  ): Promise<Count> {
    return this.orientacionSexualRepository.updateAll(orientacionSexual, where);
  }

  @get('/orientacion-sexual/{id}', {
    responses: {
      '200': {
        description: 'OrientacionSexual model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrientacionSexual, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrientacionSexual, {exclude: 'where'}) filter?: FilterExcludingWhere<OrientacionSexual>
  ): Promise<OrientacionSexual> {
    return this.orientacionSexualRepository.findById(id, filter);
  }

  @patch('/orientacion-sexual/{id}', {
    responses: {
      '204': {
        description: 'OrientacionSexual PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrientacionSexual, {partial: true}),
        },
      },
    })
    orientacionSexual: OrientacionSexual,
  ): Promise<void> {
    await this.orientacionSexualRepository.updateById(id, orientacionSexual);
  }

  @put('/orientacion-sexual/{id}', {
    responses: {
      '204': {
        description: 'OrientacionSexual PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orientacionSexual: OrientacionSexual,
  ): Promise<void> {
    await this.orientacionSexualRepository.replaceById(id, orientacionSexual);
  }

  @del('/orientacion-sexual/{id}', {
    responses: {
      '204': {
        description: 'OrientacionSexual DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orientacionSexualRepository.deleteById(id);
  }
}
