import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Caracterizacion, CaracterizacionRelations, Perfil} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PerfilRepository} from './perfil.repository';

export class CaracterizacionRepository extends DefaultCrudRepository<
  Caracterizacion,
  typeof Caracterizacion.prototype.id,
  CaracterizacionRelations
> {

  public readonly perfil: BelongsToAccessor<Perfil, typeof Caracterizacion.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Caracterizacion, dataSource);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
  }
}
