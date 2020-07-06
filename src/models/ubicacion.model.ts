import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Perfil} from './perfil.model';

@model()
export class Ubicacion extends Entity {
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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  pais: string;

  @belongsTo(() => Perfil)
  perfilId: string;

  constructor(data?: Partial<Ubicacion>) {
    super(data);
  }
}

export interface UbicacionRelations {
  // describe navigational properties here
}

export type UbicacionWithRelations = Ubicacion & UbicacionRelations;
