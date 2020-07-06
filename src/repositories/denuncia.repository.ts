import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Denuncia, DenunciaRelations, Perfil} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PerfilRepository} from './perfil.repository';

export class DenunciaRepository extends DefaultCrudRepository<
  Denuncia,
  typeof Denuncia.prototype.id,
  DenunciaRelations
> {

  public readonly perfil: BelongsToAccessor<Perfil, typeof Denuncia.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Denuncia, dataSource);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
  }
}
