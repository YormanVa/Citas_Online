import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Perfil} from './perfil.model';

@model()
export class Denuncia extends Entity {
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
    type: 'string',
    required: true,
  })
  rutaPruebas: string;

  @belongsTo(() => Perfil)
  perfil1: string;
  @belongsTo(() => Perfil)
  perfil2: string;

  constructor(data?: Partial<Denuncia>) {
    super(data);
  }
}

export interface DenunciaRelations {
  // describe navigational properties here
}

export type DenunciaWithRelations = Denuncia & DenunciaRelations;
