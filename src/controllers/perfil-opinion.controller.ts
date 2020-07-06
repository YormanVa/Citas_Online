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
  Opinion,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilOpinionController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/opinion', {
    responses: {
      '200': {
        description: 'Perfil has one Opinion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Opinion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Opinion>,
  ): Promise<Opinion> {
    return this.perfilRepository.opinion(id).get(filter);
  }

  @post('/perfils/{id}/opinion', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Opinion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opinion, {
            title: 'NewOpinionInPerfil',
            exclude: ['id'],
            optional: ['perfilId']
          }),
        },
      },
    }) opinion: Omit<Opinion, 'id'>,
  ): Promise<Opinion> {
    return this.perfilRepository.opinion(id).create(opinion);
  }

  @patch('/perfils/{id}/opinion', {
    responses: {
      '200': {
        description: 'Perfil.Opinion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Opinion, {partial: true}),
        },
      },
    })
    opinion: Partial<Opinion>,
    @param.query.object('where', getWhereSchemaFor(Opinion)) where?: Where<Opinion>,
  ): Promise<Count> {
    return this.perfilRepository.opinion(id).patch(opinion, where);
  }

  @del('/perfils/{id}/opinion', {
    responses: {
      '200': {
        description: 'Perfil.Opinion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Opinion)) where?: Where<Opinion>,
  ): Promise<Count> {
    return this.perfilRepository.opinion(id).delete(where);
  }
}
