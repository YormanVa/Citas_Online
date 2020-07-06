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
  Denuncia,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilDenunciaController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/denuncias', {
    responses: {
      '200': {
        description: 'Array of Perfil has many Denuncia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Denuncia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Denuncia>,
  ): Promise<Denuncia[]> {
    return this.perfilRepository.denuncia(id).find(filter);
  }

  @post('/perfils/{id}/denuncias', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Denuncia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Denuncia, {
            title: 'NewDenunciaInPerfil',
            exclude: ['id'],
            optional: ['perfil1']
          }),
        },
      },
    }) denuncia: Omit<Denuncia, 'id'>,
  ): Promise<Denuncia> {
    return this.perfilRepository.denuncia(id).create(denuncia);
  }

  @patch('/perfils/{id}/denuncias', {
    responses: {
      '200': {
        description: 'Perfil.Denuncia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Denuncia, {partial: true}),
        },
      },
    })
    denuncia: Partial<Denuncia>,
    @param.query.object('where', getWhereSchemaFor(Denuncia)) where?: Where<Denuncia>,
  ): Promise<Count> {
    return this.perfilRepository.denuncia(id).patch(denuncia, where);
  }

  @del('/perfils/{id}/denuncias', {
    responses: {
      '200': {
        description: 'Perfil.Denuncia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Denuncia)) where?: Where<Denuncia>,
  ): Promise<Count> {
    return this.perfilRepository.denuncia(id).delete(where);
  }
}
