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
import {Perfil} from '../models';
import {PerfilRepository, UsuarioRepository} from '../repositories';

export class PerfilController {
  constructor(
    @repository(PerfilRepository)
    public perfilRepository : PerfilRepository,
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
  ) {}

  @post('/perfil', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perfil)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {
            title: 'NewPerfil',
            exclude: ['id'],
          }),
        },
      },
    })
    perfil: Omit<Perfil, 'id'>,
  ): Promise<Perfil> {
    let p = await this.perfilRepository.create(perfil);
    let u ={
      correo: p.correo,
  	  contrasena : p.nombre,
     	edad: p.edad,
	    perfilId: p.id
    };
    let usuario = await this.usuarioRepository.create(u);
    usuario.contrasena = '';
    p.usuario = usuario;
    return p;
  }

  @get('/perfil/count', {
    responses: {
      '200': {
        description: 'Perfil model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Perfil) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.perfilRepository.count(where);
  }

  @get('/perfil', {
    responses: {
      '200': {
        description: 'Array of Perfil model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Perfil, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Perfil) filter?: Filter<Perfil>,
  ): Promise<Perfil[]> {
    return this.perfilRepository.find(filter);
  }

  @patch('/perfil', {
    responses: {
      '200': {
        description: 'Perfil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Perfil,
    @param.where(Perfil) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.perfilRepository.updateAll(perfil, where);
  }

  @get('/perfil/{id}', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Perfil, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Perfil, {exclude: 'where'}) filter?: FilterExcludingWhere<Perfil>
  ): Promise<Perfil> {
    return this.perfilRepository.findById(id, filter);
  }

  @patch('/perfil/{id}', {
    responses: {
      '204': {
        description: 'Perfil PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Perfil,
  ): Promise<void> {
    await this.perfilRepository.updateById(id, perfil);
  }

  @put('/perfil/{id}', {
    responses: {
      '204': {
        description: 'Perfil PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() perfil: Perfil,
  ): Promise<void> {
    await this.perfilRepository.replaceById(id, perfil);
  }

  @del('/perfil/{id}', {
    responses: {
      '204': {
        description: 'Perfil DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.perfilRepository.deleteById(id);
  }
}