import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Perfil} from './perfil.model';
import {BandejaMensaje} from './bandeja-mensaje.model';

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

  @belongsTo(() => Perfil)
  perfilId: string;

  @hasMany(() => BandejaMensaje, {keyTo: 'estado'})
  bandejaMensajes: BandejaMensaje[];

  constructor(data?: Partial<Actividad>) {
    super(data);
  }
}

export interface ActividadRelations {
  // describe navigational properties here
}

export type ActividadWithRelations = Actividad & ActividadRelations;
