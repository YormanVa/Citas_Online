import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Actividad} from './actividad.model';

@model()
export class BandejaMensaje extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  mensaje: string[];

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'date',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @belongsTo(() => Actividad, {name: 'estado'})
  perfil2: string;

  @belongsTo(() => Actividad, {name: 'estado'})
  perfil1: string;

  constructor(data?: Partial<BandejaMensaje>) {
    super(data);
  }
}

export interface BandejaMensajeRelations {
  // describe navigational properties here
}

export type BandejaMensajeWithRelations = BandejaMensaje & BandejaMensajeRelations;
