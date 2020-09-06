import ContentController from '../../../src/controller/Content.Controller';

const content = (router: any) => {
  const contentController = new ContentController();
  const path = "/content";

  /* Get content private route */
  router.get(`${path}/:id`, contentController.getContent);

  /* Store content private route */
  router.post(path, contentController.addContent);

  /* Get content By Id private route */
  router.get(`${path}/:id`, contentController.getContentById);

  /* Delete content By Id private route */
  router.delete(`${path}/:id`, contentController.deleteContent);
};
export default content;
