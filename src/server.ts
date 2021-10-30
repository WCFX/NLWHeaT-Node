import 'dotenv/config';
import express, { Request, Response } from 'express';
import http from 'https';
import cors from 'cors';
import { Server } from 'socket.io';
import router from './routes';

const server = express();
server.use(cors());

const serverHttp = http.createServer(server);

const socketIO = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

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
