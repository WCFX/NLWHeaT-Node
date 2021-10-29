import 'dotenv/config';
import express, { Request, Response } from 'express';
import router from './routes';

const server = express();
server.use(express.json());

server.use(router);

server.get('/github', (req: Request, res: Response) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  );
});

server.get('/signin/callback', (req: Request, res: Response) => {
  const { code } = req.query;

  return res.json(code);
});
server.listen(process.env.PORT, () =>
  console.log(`Server is running in PORT ${process.env.PORT}`),
);
