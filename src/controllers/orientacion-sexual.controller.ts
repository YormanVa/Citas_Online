import { authenticate } from '@loopback/authentication';
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
 
  @authenticate('TokenAdminStrategy')
  @post('/orientacion', {
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

  @get('/orientacion/count', {
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

  @get('/orientacion', {
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
  
  @authenticate('TokenAdminStrategy')
  @patch('/orientacion', {
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

  @get('/orientacion/{id}', {
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
  
  @authenticate('TokenAdminStrategy')
  @patch('/orientacion/{id}', {
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
  
  @authenticate('TokenAdminStrategy')
  @put('/orientacion/{id}', {
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
  
  @authenticate('TokenAdminStrategy')
  @del('/orientacion/{id}', {
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
