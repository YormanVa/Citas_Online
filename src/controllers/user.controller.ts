// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {UsuarioRepository} from '../repositories';
import {AuthService} from '../services/auth.service';

// import {inject} from '@loopback/core';


class Credentials {
  correo: string;
  password: string;
}

class PasswordResetData {
  correo: string;
  type: number;
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
      let tk = await this.authService.GenerateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }

  @post('/contrasena-reset', {
    responses: {
      '200': {
        description: 'Login para usuarios'
      }
    }

  })
  async reset(
    @requestBody() passwordResetData: PasswordResetData
  ): Promise<boolean> {
    let randomPassword = await this.authService.ResetPassword(passwordResetData.correo);
    //1.SMS
    //2.mail
    if (randomPassword) {
      switch (passwordResetData.type) {
        case 1:
          console.log("sending SMS" + randomPassword);
          return true;
          break;
        case 2:
          console.log("sending mail" + randomPassword);
          return true;
          break;

        default:
          throw new HttpErrors[400]("this notification type is not supported");
          break;
      }
    }
    throw new HttpErrors[400]("user not found");

  }
}

