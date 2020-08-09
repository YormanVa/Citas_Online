import {DefaultCrudRepository} from '@loopback/repository';
import {EstadoCivil, EstadoCivilRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EstadoCivilRepository extends DefaultCrudRepository<
  EstadoCivil,
  typeof EstadoCivil.prototype.id,
  EstadoCivilRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(EstadoCivil, dataSource);
  }
}
