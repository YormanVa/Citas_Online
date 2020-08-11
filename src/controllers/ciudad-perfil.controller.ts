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
  Ciudad,
  Perfil,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadPerfilController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/perfils', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Perfil',
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
    return this.ciudadRepository.perfils(id).find(filter);
  }

  @post('/ciudads/{id}/perfils', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perfil)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {
            title: 'NewPerfilInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) perfil: Omit<Perfil, 'id'>,
  ): Promise<Perfil> {
    return this.ciudadRepository.perfils(id).create(perfil);
  }

  @patch('/ciudads/{id}/perfils', {
    responses: {
      '200': {
        description: 'Ciudad.Perfil PATCH success count',
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
    return this.ciudadRepository.perfils(id).patch(perfil, where);
  }

  @del('/ciudads/{id}/perfils', {
    responses: {
      '200': {
        description: 'Ciudad.Perfil DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perfil)) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.ciudadRepository.perfils(id).delete(where);
  }
}
