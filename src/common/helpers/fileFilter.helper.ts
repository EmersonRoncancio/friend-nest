export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  if (!file) return callback(new Error('No se recibe archivo'), false);

  const extension = file.mimetype.split('/')[1];

  const validatesFiles = ['jpg', 'jpeg', 'png'];
  if (validatesFiles.includes(extension)) {
    return callback(null, true);
  }

  callback(null, false);
};
