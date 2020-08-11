import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Perfil} from './perfil.model';

@model()
export class Pais extends Entity {
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

  @hasMany(() => Ciudad)
  ciudades: Ciudad[];

  @hasMany(() => Perfil)
  perfils: Perfil[];

  constructor(data?: Partial<Pais>) {
    super(data);
  }
}

export interface PaisRelations {
  // describe navigational properties here
}

export type PaisWithRelations = Pais & PaisRelations;
