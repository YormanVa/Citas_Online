import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BandejaMensaje, BandejaMensajeRelations, Actividad} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ActividadRepository} from './actividad.repository';

export class BandejaMensajeRepository extends DefaultCrudRepository<
  BandejaMensaje,
  typeof BandejaMensaje.prototype.id,
  BandejaMensajeRelations
> {

  public readonly estado: BelongsToAccessor<Actividad, typeof BandejaMensaje.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ActividadRepository') protected actividadRepositoryGetter: Getter<ActividadRepository>,
  ) {
    super(BandejaMensaje, dataSource);
    this.estado = this.createBelongsToAccessorFor('estado', actividadRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
  }
}
