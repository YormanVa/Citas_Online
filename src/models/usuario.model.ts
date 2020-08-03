import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Perfil} from './perfil.model';

@model()
export class Usuario extends Entity {
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
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @property({
    type: 'number',
    required: true,
  })
  rol: number;

  @property({
    type: 'string',
    required: true,
  })
<<<<<<< HEAD
  fecha_nacimiento: Date;
=======
  fechaNacimiento: string;
>>>>>>> ce253b38aa2e6f317b60e4b899a55c695228dbae

  @belongsTo(() => Perfil)
  perfilId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
