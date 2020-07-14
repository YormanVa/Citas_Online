import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Actividad, BandejaMensaje} from '../models';
import {BandejaMensajeRepository} from '../repositories';

export class BandejaMensajeActividadController {
  constructor(
    @repository(BandejaMensajeRepository)
    public bandejaMensajeRepository: BandejaMensajeRepository,
  ) {}

  @authenticate('BasicStrategy')
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
