import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services';

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    const service = new AuthenticateUserService();
    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (err: any) {
      return res.status(401).json({ message: err.message });
    }
  }
}

export default AuthenticateUserController;
