import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Perfil} from './perfil.model';

@model()
export class Imagen extends Entity {
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
  ruta: string;

  @property({
    type: 'number',
    required: true,
  })
  order: number;

  @belongsTo(() => Perfil)
  perfilId: string;

  constructor(data?: Partial<Imagen>) {
    super(data);
  }
}

export interface ImagenRelations {
  // describe navigational properties here
}

export type ImagenWithRelations = Imagen & ImagenRelations;
