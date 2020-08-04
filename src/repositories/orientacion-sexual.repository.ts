import {DefaultCrudRepository} from '@loopback/repository';
import {OrientacionSexual, OrientacionSexualRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrientacionSexualRepository extends DefaultCrudRepository<
  OrientacionSexual,
  typeof OrientacionSexual.prototype.id,
  OrientacionSexualRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(OrientacionSexual, dataSource);
  }
}
