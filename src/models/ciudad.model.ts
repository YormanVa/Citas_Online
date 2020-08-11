import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Pais} from './pais.model';
import {Perfil} from './perfil.model';

@model()
export class Ciudad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @belongsTo(() => Pais)
  paisId: string;

  @hasMany(() => Perfil)
  perfils: Perfil[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
