import {Entity, model, property} from '@loopback/repository';

@model()
export class Perfil extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

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

  @property({
    type: 'boolean',
  })
  hijos?: boolean;

  @property({
    type: 'string',
  })
  nivelEscolaridad?: string;

  @property({
    type: 'boolean',
  })
  bebedor?: boolean;

  @property({
    type: 'boolean',
  })
  fumador?: boolean;

  @property({
    type: 'string',
  })
  ocupacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  orientacionSexual: string;


  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
