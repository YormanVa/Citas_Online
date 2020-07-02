import {DefaultCrudRepository} from '@loopback/repository';
import {BandejaMensaje, BandejaMensajeRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BandejaMensajeRepository extends DefaultCrudRepository<
  BandejaMensaje,
  typeof BandejaMensaje.prototype.id,
  BandejaMensajeRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(BandejaMensaje, dataSource);
  }
}
