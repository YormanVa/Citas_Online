import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BandejaMensaje,
  Actividad,
} from '../models';
import {BandejaMensajeRepository} from '../repositories';

export class BandejaMensajeActividadController {
  constructor(
    @repository(BandejaMensajeRepository)
    public bandejaMensajeRepository: BandejaMensajeRepository,
  ) { }

  @get('/bandeja-mensajes/{id}/actividad', {
    responses: {
      '200': {
        description: 'Actividad belonging to BandejaMensaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Actividad)},
          },
        },
      },
    },
  })
  async getActividad(
    @param.path.string('id') id: typeof BandejaMensaje.prototype.id,
  ): Promise<Actividad> {
    return this.bandejaMensajeRepository.estado(id);
  }
}
