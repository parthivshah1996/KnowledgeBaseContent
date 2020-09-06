import CategoryController from '../../../src/controller/Category.Controller';

const category = (router: any) => {
  const categoryController = new CategoryController();
  const path = "/category";

  /* Get category private route */
  router.get(path, categoryController.getCategory);

  /* Store category private route */
  router.post(path, categoryController.addCategory);

  /* Get category By Id private route */
  router.get(`${path}/:id`, categoryController.getCategoryById);

  /* Delete category By Id private route */
  router.delete(`${path}/:id`, categoryController.deleteCategory);

  /* Update category By Id private route */
  router.put(path, categoryController.updateCategory);
};
export default category;
