import {repository} from '@loopback/repository';
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

  async GenerateToken(user:Usuario){
    user.contrasena = '';
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data:{
        _id: user.id,
        username: user.correo,
        edad: user.edad,
        perfilId: user.perfilId
      }
    },
    keys.JWT_SECRET_KEY );
    return token;
  }

}
