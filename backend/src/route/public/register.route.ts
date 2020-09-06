import UserRegistrationController
  from '../../../src/controller/UserRegistration.Controller';
import {
  validateObjectMiddleware,
} from '../../../src/middleware/ObjectValidation.Middleware';
import {
  UserRegistrationValidator,
} from '../../../src/validation/ObjectsTo.Validate';

const register = (router: any) => {
  const userRegistrationController = new UserRegistrationController();
  const path = "/registration";

  router.post(
    path,
    validateObjectMiddleware(UserRegistrationValidator),
    userRegistrationController.createUserRegistration
  );
};
export default register;
