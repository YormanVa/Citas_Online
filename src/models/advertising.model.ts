import {Entity, model, property} from '@loopback/repository';

@model()
export class Advertising extends Entity {
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
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  texto: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;


  constructor(data?: Partial<Advertising>) {
    super(data);
  }
}

export interface AdvertisingRelations {
  // describe navigational properties here
}

export type AdvertisingWithRelations = Advertising & AdvertisingRelations;
