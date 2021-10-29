import { Router } from 'express';
import { AuthenticateUserController } from '../controllers';

const router = Router();

router.post('/authenticate', new AuthenticateUserController().handle);

export default router;
