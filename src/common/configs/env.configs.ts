export const envConfigs = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  cloudNameCloudinary: process.env.CLOUD_NAME_CLOUDINARY,
  apiKeyCloudinary: process.env.API_KEY_CLOUDINARY,
  apiSecretCloudinary: process.env.API_SECRET_CLOUDINARY,
});
