import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Pais, PaisRelations, Ciudad, Perfil} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CiudadRepository} from './ciudad.repository';
import {PerfilRepository} from './perfil.repository';

export class PaisRepository extends DefaultCrudRepository<
  Pais,
  typeof Pais.prototype.id,
  PaisRelations
> {

  public readonly ciudades: HasManyRepositoryFactory<Ciudad, typeof Pais.prototype.id>;

  public readonly perfils: HasManyRepositoryFactory<Perfil, typeof Pais.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Pais, dataSource);
    this.perfils = this.createHasManyRepositoryFactoryFor('perfils', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfils', this.perfils.inclusionResolver);
    this.ciudades = this.createHasManyRepositoryFactoryFor('ciudades', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
  }
}
