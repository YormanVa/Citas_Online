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
        break;

      case 'TokenStrategy':
        return new BearerStrategy(this.verifyToken.bind(this));


      default:
        return Promise.reject(`The strategy ${name} is not available.`);
        break;
    }

  }

  verifyUser(
    correo: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {

    let user = this.authService.Identify(correo, password);
    return cb(null, user);

  }
  verifyToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void
  ) {
    this.authService.VerifyToken(token).then(verification => {
      if (verification) {
        return cb(null, verification);
      }
      return cb(null, false);
    });
  }
}
