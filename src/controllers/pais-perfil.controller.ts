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
  Pais,
  Perfil,
} from '../models';
import {PaisRepository} from '../repositories';

export class PaisPerfilController {
  constructor(
    @repository(PaisRepository) protected paisRepository: PaisRepository,
  ) { }

  @get('/pais/{id}/perfils', {
    responses: {
      '200': {
        description: 'Array of Pais has many Perfil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Perfil>,
  ): Promise<Perfil[]> {
    return this.paisRepository.perfils(id).find(filter);
  }

  @post('/pais/{id}/perfils', {
    responses: {
      '200': {
        description: 'Pais model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perfil)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pais.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {
            title: 'NewPerfilInPais',
            exclude: ['id'],
            optional: ['paisId']
          }),
        },
      },
    }) perfil: Omit<Perfil, 'id'>,
  ): Promise<Perfil> {
    return this.paisRepository.perfils(id).create(perfil);
  }

  @patch('/pais/{id}/perfils', {
    responses: {
      '200': {
        description: 'Pais.Perfil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Partial<Perfil>,
    @param.query.object('where', getWhereSchemaFor(Perfil)) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.paisRepository.perfils(id).patch(perfil, where);
  }

  @del('/pais/{id}/perfils', {
    responses: {
      '200': {
        description: 'Pais.Perfil DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perfil)) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.paisRepository.perfils(id).delete(where);
  }
}
