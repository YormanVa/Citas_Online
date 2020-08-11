import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Ciudad, CiudadRelations, Pais, Perfil} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PaisRepository} from './pais.repository';
import {PerfilRepository} from './perfil.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly pais: BelongsToAccessor<Pais, typeof Ciudad.prototype.id>;

  public readonly perfils: HasManyRepositoryFactory<Perfil, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Ciudad, dataSource);
    this.perfils = this.createHasManyRepositoryFactoryFor('perfils', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfils', this.perfils.inclusionResolver);
    this.pais = this.createBelongsToAccessorFor('pais', paisRepositoryGetter,);
    this.registerInclusionResolver('pais', this.pais.inclusionResolver);
  }
}
