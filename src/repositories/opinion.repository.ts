import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Opinion, OpinionRelations, Perfil} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PerfilRepository} from './perfil.repository';

export class OpinionRepository extends DefaultCrudRepository<
  Opinion,
  typeof Opinion.prototype.id,
  OpinionRelations
> {

  public readonly perfil: BelongsToAccessor<Perfil, typeof Opinion.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Opinion, dataSource);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
  }
}
