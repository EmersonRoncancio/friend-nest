import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from '../configs/cloudinary.config';

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudNameCloudinary,
  api_key: cloudinaryConfig.apiKeyCloudinary,
  api_secret: cloudinaryConfig.apiSecretCloudinary,
  secure: true,
});

export const cloudinaryAdapter = {
  uploadImage: async (filePath: string, folder: string) => {
    return cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
  },
  uploadImageArr: async (filePath: string | string[]) => {
    if (Array.isArray(filePath)) {
      const filesArr = filePath.map((file) => {
        return cloudinary.uploader.upload(file, {
          folder: 'Zapatos',
        });
      });

      return filesArr;
    }
  },
  deleteImageArr: async (publicId: string | string[]) => {
    if (Array.isArray(publicId)) {
      const filesArr = publicId.map((id) => {
        return cloudinary.uploader.destroy(id);
      });

      return filesArr;
    }
  },
};
