// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {UsuarioRepository} from '../repositories';
import {post, HttpErrors, requestBody} from '@loopback/rest';
import {AuthService} from '../services/auth.service';

// import {inject} from '@loopback/core';


class Credentials {
  correo: string;
  password: string;
}

export class UserController {

  authService: AuthService;

  constructor(
    @repository(UsuarioRepository)
    public userRepository: UsuarioRepository
  ) {
    this.authService = new AuthService(this.userRepository);
  }

  @post('login', {
    responses: {
      '200': {
        description: 'Login para usuarios'
      }
    }

  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<object> {
    let user = await this.authService.Identify(credentials.correo, credentials.password)
    if (user) {
      let tk = this.authService.GenerateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }

  }

}

