import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,





  HttpErrors, oas,
  param,
  Response,
  RestBindings
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {UploadFilesKeys} from '../keys/carga-archivos-keys';
import {Advertising, Perfil, Imagen} from '../models';
import {AdvertisingRepository, PerfilRepository, ImagenRepository} from '../repositories';

const readdir = promisify(fs.readdir);

/**
 * A controller to handle file downloads using multipart/form-data media type
 */
export class DescargArchController {

  constructor(
    @repository(PerfilRepository)
    private PerfilRepository: PerfilRepository,
    @repository(ImagenRepository)
    private ImagenRepository: ImagenRepository,
    @repository(AdvertisingRepository)
    private advertisingRepository: AdvertisingRepository,
  ) {}

  /**
   *
   * @param type
   * @param id
   */
  @get('/files/{type}', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listFiles(
    @param.path.number('type') type: number,) {
    const folderPath = this.GetFolderPathByType(type);
    const files = await readdir(folderPath);
    return files;
  }

  /**
   *
   * @param type
   * @param recordId
   * @param response
   */
  @get('/files/{type}/{recordId}')
  @oas.response.file()
  async downloadFile(
    @param.path.number('type') type: number,
    @param.path.string('recordId') recordId: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const folder = this.GetFolderPathByType(type);
    const fileName = await this.GetFilenameById(type, recordId);
    const file = this.ValidateFileName(folder, fileName);
    response.download(file, fileName);
    return response;
  }

  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  private GetFolderPathByType(type: number) {
    let filePath = '';
    switch (type) {
      // Perfil
      case 1:
        filePath = path.join(__dirname, UploadFilesKeys.PERFIL_IMAGE_PATH);
        
        break;
      
      // advertising
      case 2:
        filePath = path.join(__dirname, UploadFilesKeys.ADVERTISING_IMAGE_PATH);
        
        break;
    }
    return filePath;
  }

  /**
   *
   * @param type
   */
  private async GetFilenameById(type: number, recordId: string) {
    let fileName = '';
    switch (type) {
      // Perfil
      
      // perfil
      case 1:
        const Imagen: Imagen = await this.ImagenRepository.findById(recordId);
        fileName = Imagen.ruta;
        break;
      // advertising
      case 2:
        const adv: Advertising = await this.advertisingRepository.findById(recordId);
        fileName = adv.imagen;
        break;
    }
    return fileName;
  }

  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private ValidateFileName(folder: string, fileName: string) {
    const resolved = path.resolve(folder, fileName);
    if (resolved.startsWith(folder)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors[400](`Invalid file name: ${fileName}`);
  }

}