import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Actividad, ActividadRelations, Perfil, BandejaMensaje} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PerfilRepository} from './perfil.repository';
import {BandejaMensajeRepository} from './bandeja-mensaje.repository';

export class ActividadRepository extends DefaultCrudRepository<
  Actividad,
  typeof Actividad.prototype.id,
  ActividadRelations
> {

  public readonly perfil: BelongsToAccessor<Perfil, typeof Actividad.prototype.id>;

  public readonly bandejaMensajes: HasManyRepositoryFactory<BandejaMensaje, typeof Actividad.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>, @repository.getter('BandejaMensajeRepository') protected bandejaMensajeRepositoryGetter: Getter<BandejaMensajeRepository>,
  ) {
    super(Actividad, dataSource);
    this.bandejaMensajes = this.createHasManyRepositoryFactoryFor('bandejaMensajes', bandejaMensajeRepositoryGetter,);
    this.registerInclusionResolver('bandejaMensajes', this.bandejaMensajes.inclusionResolver);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
  }
}
