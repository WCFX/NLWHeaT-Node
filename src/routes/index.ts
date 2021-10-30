import { Router } from 'express';
import {
  AuthenticateUserController,
  CreateMessageController,
} from '../controllers';
import { EnsureAuthenticated } from '../middleware';

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);

router.post(
  '/message',
  EnsureAuthenticated,
  new CreateMessageController().handle,
);

export default router;
