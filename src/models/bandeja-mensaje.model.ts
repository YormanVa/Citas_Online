import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<BandejaMensaje>) {
    super(data);
  }
}

export interface BandejaMensajeRelations {
  // describe navigational properties here
}

export type BandejaMensajeWithRelations = BandejaMensaje & BandejaMensajeRelations;
