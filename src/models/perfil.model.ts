import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Imagen} from './imagen.model';
import {Actividad} from './actividad.model';
import {Caracterizacion} from './caracterizacion.model';

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
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'string',
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
    required: true,
  })
  estadoCivil: string;

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
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'string',
    required: true,
  })
  orientacionSexual: string;
  

  

  @hasMany(() => Imagen)
  imagenes: Imagen[];

  @hasMany(() => Actividad)
  actividades: Actividad[];

  @hasMany(() => Caracterizacion)
  caracterizaciones: Caracterizacion[];

  @hasOne(() => Usuario)
  usuario: Usuario;

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
