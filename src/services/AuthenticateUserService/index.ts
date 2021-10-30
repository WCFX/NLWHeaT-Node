import axios from 'axios';
import prismaClient from '../../prisma';
import { sign } from 'jsonwebtoken';

interface IAcessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    let { data: accessTokenReponse } = await axios.post<IAcessTokenResponse>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const res = await axios.get<IUserResponse>('https://api.github.com/users', {
      headers: {
        authorization: `Bearer ${accessTokenReponse.access_token}`,
      },
    });

    let { login, id, name, avatar_url } = res.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const md5 = process.env.JWT_SECRET;

    if (!md5) throw new Error('JWT_SECRET not found');

    let token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
          login,
        },
      },
      md5,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { token, user };
  }
}

export default AuthenticateUserService;
