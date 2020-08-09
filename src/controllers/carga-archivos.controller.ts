import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {UploadFilesKeys} from '../keys/carga-archivos-keys';
import {Perfil, Imagen} from '../models';
import {AdvertisingRepository, PerfilRepository, ImagenRepository} from '../repositories';



export class CargaArchivosController {
  constructor(
    @repository(PerfilRepository)
    private perfilRepository: PerfilRepository,
    @repository(ImagenRepository)
    private imagenRepository: ImagenRepository,

  ) {}



  /**
   *
   * @param response
   * @param advertisingId
   * @param request
   */
  @post('/advertisingImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Advertising Image',
      },
    },
  })
  async advertisingImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const advertisingImagePath = path.join(__dirname, UploadFilesKeys.ADVERTISING_IMAGE_PATH);
    let res = await this.StoreFileToPath(advertisingImagePath, UploadFilesKeys.ADVERTISING_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }



  // /**
  //  * Add or replace the profile photo of a perfil by perfilId
  //  * @param request
  //  * @param perfilId
  //  * @param response
  //  */
  // @post('/perfilPhoto', {
  //   responses: {
  //     200: {
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'object',
  //           },
  //         },
  //       },
  //       description: 'Perfil foto',
  //     },
  //   },
  // })
  // async perfilPhotoUpload(
  //   @inject(RestBindings.Http.RESPONSE) response: Response,
  //   @param.query.string('perfilId') perfilId: string,
  //   @requestBody.file() request: Request,
  // ): Promise<object | false> {
  //   const perfilPhotoPath = path.join(__dirname, UploadFilesKeys.PERFIL_IMAGE_PATH);
  //   let res = await this.StoreFileToPath(perfilPhotoPath, UploadFilesKeys.PERFIL_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
  //   if (res) {
  //     const filename = response.req?.file.filename;
  //     if (filename) {
  //       let p: Perfil = await this.perfilRepository.findById(perfilId);
  //       if (p) {
  //         p.perfilFoto= filename;
  //         this.perfilRepository.replaceById(perfilId, p);
  //         return {filename: filename};
  //       }
  //     }
  //   }
  //   return res;
  // }


  /**
   * Add a new image or replace another one that exists of a perfil
   * @param request
   * @param response
   * @param perfilId
   * @param imageId if this parameter is empty then the images will be added, on the contrary it will be replaced
   */
  @post('/perfilImagen', {
    responses: {
      200: {
        content: {
          'application/json': {
          },
        },
        description: 'Perfil Imagen',
      },
    },
  })
  async perfilImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('perfilId') perfilId: typeof Perfil.prototype.id,
    @param.query.number('order') order: number,
    @param.query.string('imageId') imagenId: typeof Imagen.prototype.id,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const perfilPath = path.join(__dirname, UploadFilesKeys.PERFIL_IMAGE_PATH);
    let res = await this.StoreFileToPath(perfilPath, UploadFilesKeys.PERFIL_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        let prf: Imagen;
        if (imagenId) {
          prf = await this.imagenRepository.findById(imagenId);
          prf.ruta = filename;
          prf.order = order;
          await this.imagenRepository.replaceById(imagenId, prf);
        } else {
          prf = new Imagen({
            ruta: filename,
            order: order,
            perfilId: perfilId ?? ''
          });
          await this.imagenRepository.create(prf);
        }
        return {filename: filename};
      }
    }
    return res;
  }


  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path)
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('This format file is not supported.'));
        },
        limits: {
          fileSize: UploadFilesKeys.MAX_FILE_SIZE
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }
}
