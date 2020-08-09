// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {EmailNotification, SmsNotification} from '../models';
import {PerfilRepository, UsuarioRepository} from '../repositories';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../services/notification.service';

// import {inject} from '@loopback/core';


class Credentials {
  correo: string;
  password: string;
}

class ChangePasswordData {
  id: string;
  currentPassword: string;
  newPassword: string;
}

class PasswordResetData {
  correo: string;
  type: number;
}

export class UserController {

  authService: AuthService;

  constructor(
    @repository(UsuarioRepository)
    public userRepository: UsuarioRepository,
    @repository(PerfilRepository)
    public perfilRepository: PerfilRepository
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
      throw new HttpErrors[401]("Usuario o contraseña invalidos.");
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
      let perfil = await this.perfilRepository.findOne({where: {correo: passwordResetData.correo}});
      switch (passwordResetData.type) {
        case 1:
          if (perfil) {
            let notification = new SmsNotification({
              body: `Hey,tu nueva contraseña es: ${randomPassword}`,
              to: perfil.phone
            });
            console.log(perfil.phone)
            let sms = await new NotificationService().SmsNotification(notification);
            if (sms) {
              console.log("Mensaje de texto enviado");
              console.log(`Hey,tu nueva contraseña es: ${randomPassword}`);
              return true
            }
            throw new HttpErrors[400]("Phone is not found");

          }
          throw new HttpErrors[400]("User not found");

          break;
        case 2:
          if (perfil) {
            let notification = new EmailNotification({
              textBody: `Hey, tu nueva contraseña es:${randomPassword}`,
              htmlBody: `Hey, tu nueva contraseña es: ${randomPassword}`,
              
              to: perfil.correo,
              subject: 'Nueva contraseña'
            });
            console.log(perfil.correo)
            let mail = await new NotificationService().EmailNotification(notification);
            if (mail) {
              console.log("Correo electrónico enviado")
              console.log(`Hey, tu nueva contraseña es:${randomPassword}`);
              return true
            }
            throw new HttpErrors[400]("Email is not found");

          }
          throw new HttpErrors[401]("User not found");
          break;

        default:
          throw new HttpErrors[400]("this notification type is not supported");
          break;
      }
    }
    throw new HttpErrors[401]("user not found");

  }

  @post('/cambiar-contrasena', {
    responses: {
      '200': {
        description: 'Login para usuarios'
      }
    }

  })
  async changePassword(
    @requestBody() data: ChangePasswordData): Promise<boolean> {
    let user = await this.authService.VerifyUsertoChangePassword(data.id, data.currentPassword);
    if (user) {
      return await this.authService.ChangePassword(user, data.newPassword);
    } else {
      throw new HttpErrors[401]("Usuario o contraseña invalidos.");
    }
  }

}

