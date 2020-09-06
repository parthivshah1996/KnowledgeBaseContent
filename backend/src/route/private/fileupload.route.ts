import multer from 'multer';
const path = require('path');

import FileUploadController from '../../controller/FileUpload.Controller';


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
const fileUpload = (router: any) => {
  const fileUploadController = new FileUploadController();

  const path = "/file";

  /* fileUpload private route */
  router.post(
    `${path}`,
    upload.single("file"),
    fileUploadController.fileUpload
  );
};
export default fileUpload;
