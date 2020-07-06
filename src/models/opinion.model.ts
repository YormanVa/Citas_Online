import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Perfil} from './perfil.model';

@model()
export class Opinion extends Entity {
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
  descripcion: string;

  @belongsTo(() => Perfil)
  perfilId: string;

  constructor(data?: Partial<Opinion>) {
    super(data);
  }
}

export interface OpinionRelations {
  // describe navigational properties here
}

export type OpinionWithRelations = Opinion & OpinionRelations;
