export const envConfigs = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  keyjwt: process.env.KEYJWT,
});
