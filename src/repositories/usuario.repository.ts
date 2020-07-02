import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Perfil} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PerfilRepository} from './perfil.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly perfil: HasOneRepositoryFactory<Perfil, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Usuario, dataSource);
    this.perfil = this.createHasOneRepositoryFactoryFor('perfil', perfilRepositoryGetter);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
  }
}
