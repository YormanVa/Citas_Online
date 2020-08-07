import {Entity, model, property} from '@loopback/repository';

@model()
export class OrientacionSexual extends Entity {
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


  constructor(data?: Partial<OrientacionSexual>) {
    super(data);
  }
}

export interface OrientacionSexualRelations {
  // describe navigational properties here
}

export type OrientacionSexualWithRelations = OrientacionSexual & OrientacionSexualRelations;
