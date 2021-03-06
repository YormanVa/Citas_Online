import {Entity, hasMany, hasOne, model, property, belongsTo} from '@loopback/repository';
import {Actividad} from './actividad.model';
import {Caracterizacion} from './caracterizacion.model';
import {Denuncia} from './denuncia.model';
import {Imagen} from './imagen.model';
import {Opinion} from './opinion.model';
import {Ubicacion} from './ubicacion.model';
import {Usuario} from './usuario.model';
import {Ciudad} from './ciudad.model';
import {Pais} from './pais.model';

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
  phone: string;


  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaNacimiento: "string";

  @property({
    type: 'string',
  })
  nivelEscolaridad?: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoCivil: string;

  @property({
    type: 'string',
    required: true,
  })
  orientacionSexual: string;


  @property({
    type: 'string',
  })
  ocupacion?: string;

  @property({
    type: 'string',
    required: false,
  })
  perfilFoto?: string;


  @property({
    type: 'boolean',
  })
  hijos?: boolean;

  @property({
    type: 'boolean',
  })
  fumador?: boolean;

  @property({
    type: 'boolean',
  })
  bebedor?: boolean;


  @property({
    type: 'string',
    required: false,
  })
  intereses?: string;

  






  @hasMany(() => Actividad)
  actividades: Actividad[];

  @hasMany(() => Caracterizacion)
  caracterizaciones: Caracterizacion[];

  @hasOne(() => Usuario)
  usuario: Usuario;

  @hasMany(() => Denuncia)
  denuncia: Denuncia[];

  @hasOne(() => Ubicacion)
  ubicacion: Ubicacion;

  @hasOne(() => Opinion)
  opinion: Opinion;

  @belongsTo(() => Pais)
  paisId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;


  @hasMany(() => Imagen)
  imagenes: Imagen[];

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
