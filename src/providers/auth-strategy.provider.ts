import {Provider, inject, ValueOrPromise} from '@loopback/context';
import {Strategy} from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,

} from '@loopback/authentication';
import {BasicStrategy} from 'passport-http';
import {AuthService} from '../services/auth.service';
import {repository} from '@loopback/repository';
import {UsuarioRepository} from '../repositories';
import {Strategy as BearerStrategy} from 'passport-http-bearer';


export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  authService: AuthService;

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UsuarioRepository)
    public userRepository: UsuarioRepository
  ) {
    this.authService = new AuthService(userRepository);
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    switch (name) {
      case 'BasicStrategy':
        return new BasicStrategy(this.verifyUser.bind(this));

      case 'TokenPerfilStrategy':
        return new BearerStrategy(this.verifyPerfilToken.bind(this));

        case 'TokenAdminStrategy':
          console.log(this.verifyAdminToken.bind(this))
          return new BearerStrategy(this.verifyAdminToken.bind(this));

      default:
        return Promise.reject(`The strategy ${name} is not available.`);
        break;
    }

  }

  async verifyUser(
    correo: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {

    let user = this.authService.Identify(correo, password);
    return cb(null, user);

  }
  verifyPerfilToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void
  ) {
    this.authService.VerifyToken(token).then(info=> {
      if (info && info.rol ==1) {
        console.log("vp",token)
        return cb(null, info);
      }
      return cb(null, false);
    });
  }
  verifyAdminToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void
  ) {
     console.log(token);
    this.authService.VerifyToken(token).then(info => {
      console.log(info)
      if (info && info.rol == 2) {
        console.log("im ad")
        return cb(null, info);
      }
      return cb(null, false);
    });
  }
}
