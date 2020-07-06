import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Perfil, PerfilRelations, Usuario, Imagen, Actividad, Caracterizacion, Denuncia, Ubicacion, Opinion} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {ImagenRepository} from './imagen.repository';
import {ActividadRepository} from './actividad.repository';
import {CaracterizacionRepository} from './caracterizacion.repository';
import {DenunciaRepository} from './denuncia.repository';
import {UbicacionRepository} from './ubicacion.repository';
import {OpinionRepository} from './opinion.repository';

export class PerfilRepository extends DefaultCrudRepository<
  Perfil,
  typeof Perfil.prototype.id,
  PerfilRelations
> {



  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Perfil.prototype.id>;

  public readonly actividades: HasManyRepositoryFactory<Actividad, typeof Perfil.prototype.id>;

  public readonly caracterizaciones: HasManyRepositoryFactory<Caracterizacion, typeof Perfil.prototype.id>;

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Perfil.prototype.id>;

  public readonly denuncia: HasManyRepositoryFactory<Denuncia, typeof Perfil.prototype.id>;

  public readonly ubicacion: HasOneRepositoryFactory<Ubicacion, typeof Perfil.prototype.id>;

  public readonly opinion: HasOneRepositoryFactory<Opinion, typeof Perfil.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>, @repository.getter('ActividadRepository') protected actividadRepositoryGetter: Getter<ActividadRepository>, @repository.getter('CaracterizacionRepository') protected caracterizacionRepositoryGetter: Getter<CaracterizacionRepository>, @repository.getter('DenunciaRepository') protected denunciaRepositoryGetter: Getter<DenunciaRepository>, @repository.getter('UbicacionRepository') protected ubicacionRepositoryGetter: Getter<UbicacionRepository>, @repository.getter('OpinionRepository') protected opinionRepositoryGetter: Getter<OpinionRepository>,
  ) {
    super(Perfil, dataSource);
    this.opinion = this.createHasOneRepositoryFactoryFor('opinion', opinionRepositoryGetter);
    this.registerInclusionResolver('opinion', this.opinion.inclusionResolver);
    this.ubicacion = this.createHasOneRepositoryFactoryFor('ubicacion', ubicacionRepositoryGetter);
    this.registerInclusionResolver('ubicacion', this.ubicacion.inclusionResolver);
    this.denuncia = this.createHasManyRepositoryFactoryFor('denuncia', denunciaRepositoryGetter,);
    this.registerInclusionResolver('denuncia', this.denuncia.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.caracterizaciones = this.createHasManyRepositoryFactoryFor('caracterizaciones', caracterizacionRepositoryGetter,);
    this.registerInclusionResolver('caracterizaciones', this.caracterizaciones.inclusionResolver);
    this.actividades = this.createHasManyRepositoryFactoryFor('actividades', actividadRepositoryGetter,);
    this.registerInclusionResolver('actividades', this.actividades.inclusionResolver);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
   
  }
}
