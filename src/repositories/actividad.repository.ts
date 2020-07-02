import {DefaultCrudRepository} from '@loopback/repository';
import {Actividad, ActividadRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ActividadRepository extends DefaultCrudRepository<
  Actividad,
  typeof Actividad.prototype.id,
  ActividadRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Actividad, dataSource);
  }
}
