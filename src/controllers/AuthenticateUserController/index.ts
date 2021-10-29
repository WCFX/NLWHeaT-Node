import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services';

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    const service = new AuthenticateUserService();
    const result = await service.execute(code);

    return res.json(result);
  }
}

export default AuthenticateUserController;