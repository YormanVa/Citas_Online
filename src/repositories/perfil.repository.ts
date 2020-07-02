import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Perfil, PerfilRelations, Usuario, Imagen, Actividad, Caracterizacion} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {ImagenRepository} from './imagen.repository';
import {ActividadRepository} from './actividad.repository';
import {CaracterizacionRepository} from './caracterizacion.repository';

export class PerfilRepository extends DefaultCrudRepository<
  Perfil,
  typeof Perfil.prototype.id,
  PerfilRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Perfil.prototype.id>;

  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Perfil.prototype.id>;

  public readonly actividades: HasManyRepositoryFactory<Actividad, typeof Perfil.prototype.id>;

  public readonly caracterizaciones: HasManyRepositoryFactory<Caracterizacion, typeof Perfil.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>, @repository.getter('ActividadRepository') protected actividadRepositoryGetter: Getter<ActividadRepository>, @repository.getter('CaracterizacionRepository') protected caracterizacionRepositoryGetter: Getter<CaracterizacionRepository>,
  ) {
    super(Perfil, dataSource);
    this.caracterizaciones = this.createHasManyRepositoryFactoryFor('caracterizaciones', caracterizacionRepositoryGetter,);
    this.registerInclusionResolver('caracterizaciones', this.caracterizaciones.inclusionResolver);
    this.actividades = this.createHasManyRepositoryFactoryFor('actividades', actividadRepositoryGetter,);
    this.registerInclusionResolver('actividades', this.actividades.inclusionResolver);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
