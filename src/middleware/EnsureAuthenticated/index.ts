import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

const EnsureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      errorCode: 'Token Invalid.',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET || '') as IPayload;

    req.user_id = sub;
    return next();
  } catch (error) {
    return res.status(401).json({ errorCode: 'Token Expired.' });
  }
};

export default EnsureAuthenticated;
