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
  Actividad,
  BandejaMensaje,
} from '../models';
import {ActividadRepository} from '../repositories';

export class ActividadBandejaMensajeController {
  constructor(
    @repository(ActividadRepository) protected actividadRepository: ActividadRepository,
  ) { }

  @get('/actividads/{id}/bandeja-mensajes', {
    responses: {
      '200': {
        description: 'Array of Actividad has many BandejaMensaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BandejaMensaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<BandejaMensaje>,
  ): Promise<BandejaMensaje[]> {
    return this.actividadRepository.bandejaMensajes(id).find(filter);
  }

  @post('/actividads/{id}/bandeja-mensajes', {
    responses: {
      '200': {
        description: 'Actividad model instance',
        content: {'application/json': {schema: getModelSchemaRef(BandejaMensaje)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Actividad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BandejaMensaje, {
            title: 'NewBandejaMensajeInActividad',
            exclude: ['id'],
            optional: ['estado']
          }),
        },
      },
    }) bandejaMensaje: Omit<BandejaMensaje, 'id'>,
  ): Promise<BandejaMensaje> {
    return this.actividadRepository.bandejaMensajes(id).create(bandejaMensaje);
  }

  @patch('/actividads/{id}/bandeja-mensajes', {
    responses: {
      '200': {
        description: 'Actividad.BandejaMensaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BandejaMensaje, {partial: true}),
        },
      },
    })
    bandejaMensaje: Partial<BandejaMensaje>,
    @param.query.object('where', getWhereSchemaFor(BandejaMensaje)) where?: Where<BandejaMensaje>,
  ): Promise<Count> {
    return this.actividadRepository.bandejaMensajes(id).patch(bandejaMensaje, where);
  }

  @del('/actividads/{id}/bandeja-mensajes', {
    responses: {
      '200': {
        description: 'Actividad.BandejaMensaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(BandejaMensaje)) where?: Where<BandejaMensaje>,
  ): Promise<Count> {
    return this.actividadRepository.bandejaMensajes(id).delete(where);
  }
}
