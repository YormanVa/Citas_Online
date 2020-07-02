import {Entity, model, property} from '@loopback/repository';

@model()
export class Caracterizacion extends Entity {
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
  sexo: string;

  @property({
    type: 'number',
  })
  estatura?: number;

  @property({
    type: 'boolean',
  })
  hijos?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  tipoRelacion: string;

  @property({
    type: 'geopoint',
    required: true,
  })
  ubicacion: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;


  constructor(data?: Partial<Caracterizacion>) {
    super(data);
  }
}

export interface CaracterizacionRelations {
  // describe navigational properties here
}

export type CaracterizacionWithRelations = Caracterizacion & CaracterizacionRelations;
