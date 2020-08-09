import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoCivil extends Entity {
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
  tipo: string;


  constructor(data?: Partial<EstadoCivil>) {
    super(data);
  }
}

export interface EstadoCivilRelations {
  // describe navigational properties here
}

export type EstadoCivilWithRelations = EstadoCivil & EstadoCivilRelations;
