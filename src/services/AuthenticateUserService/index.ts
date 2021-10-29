import axios from 'axios';

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

    const { data: acessTokenReponse } = await axios.post<IAcessTokenResponse>(
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
        Authorization: `Bearer ${acessTokenReponse.access_token}`,
      },
    });

    return res.data;
  }
}

export default AuthenticateUserService;
