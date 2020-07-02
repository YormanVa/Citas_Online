import {Entity, model, property} from '@loopback/repository';

@model()
export class Actividad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  estado: number;

  @property({
    type: 'object',
    required: true,
  })
  perfil1: object;

  @property({
    type: 'object',
    required: true,
  })
  perfil2: object;


  constructor(data?: Partial<Actividad>) {
    super(data);
  }
}

export interface ActividadRelations {
  // describe navigational properties here
}

export type ActividadWithRelations = Actividad & ActividadRelations;
