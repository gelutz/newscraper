import { Router } from 'express';
import { optionalAuth, bearerAuth } from '../middlewares/Auth';

import UsersController from '../controllers/UsersController';

const usersRoute = Router();

usersRoute.get('/:id', optionalAuth, UsersController.getById);
usersRoute.post('/', optionalAuth, UsersController.create);

usersRoute.patch('/:id', bearerAuth, UsersController.update);
usersRoute.delete('/:id', bearerAuth, UsersController.delete);
export default usersRoute;
