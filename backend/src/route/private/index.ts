import Express from 'express';

import fileUpload from './fileupload.route';
import content from './content.route';
import category from './category.route';

// create router instance
const router = Express.Router();

content(router);

category(router);

fileUpload(router);
export default router;
