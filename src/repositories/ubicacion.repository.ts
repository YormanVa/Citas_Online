import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Ubicacion, UbicacionRelations, Perfil} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PerfilRepository} from './perfil.repository';

export class UbicacionRepository extends DefaultCrudRepository<
  Ubicacion,
  typeof Ubicacion.prototype.id,
  UbicacionRelations
> {

  public readonly perfil: BelongsToAccessor<Perfil, typeof Ubicacion.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Ubicacion, dataSource);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
  }
}
