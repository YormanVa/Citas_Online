import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Actividad} from './actividad.model';
import {Caracterizacion} from './caracterizacion.model';
import {Denuncia} from './denuncia.model';
import {Imagen} from './imagen.model';
import {Opinion} from './opinion.model';
import {Ubicacion} from './ubicacion.model';
import {Usuario} from './usuario.model';

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
<<<<<<< HEAD
  fecha_nacimiento: Date;
=======
  fechaNacimiento: "string";
>>>>>>> ce253b38aa2e6f317b60e4b899a55c695228dbae

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
    type: 'boolean',
    required: false,
  })
  estado: boolean;






  @hasMany(() => Imagen)
  imagenes: Imagen[];

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

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
