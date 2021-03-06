import {repository} from '@loopback/repository';
import {generate as generator} from 'generate-password';
import {PasswordKeys as passKeys} from '../keys/password-keys';
import {ServiceKeys as keys} from '../keys/services-keys';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from './encrypt-decrypt.service';
const jwt = require("jsonwebtoken");

export class AuthService {
  constructor(
    @repository(UsuarioRepository)
    public userRepository: UsuarioRepository
  ) {

  }

  /**
   *
   * @param correo
   * @param password
   */

  async Identify(correo: string, password: string): Promise<Usuario | false> {
    let user = await this.userRepository.findOne({where: {correo: correo}});
    if (user) {
      let cryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT).Encrypt(password);
      if (user.contrasena == cryptPass) {
        return user;
      }
    }
    return false;
  }

  async VerifyUsertoChangePassword(id: string, currentPassword: string): Promise<Usuario | false> {
    let user = await this.userRepository.findById(id);
    if (user) {
      let cryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT).Encrypt(currentPassword);
      if (user.contrasena == cryptPass) {
        return user;
      }
    }
    return false;
  }

  async ChangePassword(user: Usuario, newPassword: string): Promise<boolean> {
    try{
    let encryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT).Encrypt(newPassword);
    user.contrasena = encryptPass;
    await this.userRepository.updateById(user.id,user);
    return true;}
    catch(_){
      return false;
    }
  }

  /**
   *
   * @param user
   */

  async GenerateToken(user: Usuario) {
    user.contrasena = '';
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        _id: user.id,
        username: user.correo,
        rol: user.rol,
        fechaNacimiento: user.fechaNacimiento,
        perfilId: user.perfilId
      }
    },
      keys.JWT_SECRET_KEY);
    return token;
  }

  /**
   *
   * @param token
   */

  async VerifyToken(token: string) {
    try {
      let data = jwt.verify(token, keys.JWT_SECRET_KEY).data;
      return data;
    } catch (error) {
      return false;
    }
  }
  /**
   * reset user password
   * @param correo
   */
  async ResetPassword(correo: string): Promise<string | false> {
    let usuario = await this.userRepository.findOne({where: {correo: correo}});
    if (usuario) {
      let randomPassword = generator({
        length: passKeys.LENGTH,
        numbers: passKeys.NUMBERS,
        lowercase: passKeys.LOWERCASE,
        uppercase: passKeys.UPPERCASE
      });
      let crypter = new EncryptDecrypt(keys.LOGIN_CRYPT);
      let password = crypter.Encrypt(crypter.Encrypt(randomPassword));
      usuario.contrasena = password;
      this.userRepository.replaceById(usuario.id, usuario);
      return randomPassword;
    }
    return false;

  }
}
