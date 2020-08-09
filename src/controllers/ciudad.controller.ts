import { authenticate } from '@loopback/authentication';
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
  HttpErrors,
} from '@loopback/rest';
import {Ciudad} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository : CiudadRepository,
  ) {}

  
  @authenticate('TokenAdminStrategy')
  @post('/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudad',
            exclude: ['id'],
          }),
        },
      },
    })
    ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    let currentCiudad = await this.ciudadRepository.findOne({ where:{Nombre: ciudad.Nombre}});
    if (currentCiudad){
       throw new HttpErrors[401]("Esta ciudad ya existe");
    }
    else{
      return this.ciudadRepository.create(ciudad);
    }
}

  @get('/ciudad/count', {
    responses: {
      '200': {
        description: 'Ciudad model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.count(where);
  }

  @get('/ciudad', {
    responses: {
      '200': {
        description: 'Array of Ciudad model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ciudad, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Ciudad) filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.ciudadRepository.find(filter);
  }

  @patch('/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.updateAll(ciudad, where);
  }

  @get('/ciudad/{id}', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ciudad, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ciudad, {exclude: 'where'}) filter?: FilterExcludingWhere<Ciudad>
  ): Promise<Ciudad> {
    return this.ciudadRepository.findById(id, filter);
  }
  
  @authenticate('TokenAdminStrategy')
  @patch('/ciudad/{id}', {
    responses: {
      '204': {
        description: 'Ciudad PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.updateById(id, ciudad);
  }
  
  @authenticate('TokenAdminStrategy')
  @put('/ciudad/{id}', {
    responses: {
      '204': {
        description: 'Ciudad PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.replaceById(id, ciudad);
  }
  
  @authenticate('TokenAdminStrategy')
  @del('/ciudad/{id}', {
    responses: {
      '204': {
        description: 'Ciudad DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ciudadRepository.deleteById(id);
  }
}
