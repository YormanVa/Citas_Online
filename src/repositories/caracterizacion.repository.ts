import {DefaultCrudRepository} from '@loopback/repository';
import {Caracterizacion, CaracterizacionRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CaracterizacionRepository extends DefaultCrudRepository<
  Caracterizacion,
  typeof Caracterizacion.prototype.id,
  CaracterizacionRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Caracterizacion, dataSource);
  }
}
