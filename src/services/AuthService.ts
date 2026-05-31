import { httpClient } from './httpClient';

interface ISignUpDTO {
  email: string,
  password: string,
  name: string,
  phone: string
}

interface IConfirmAccountDTO {
  email: string,
  code: string,
}

interface IResendConfirmAccountDTO {
  email: string,
}

interface ISignInDTO {
  email: string,
  password: string,
}

interface refreshTokenResponse {
  accessToken: string,
  refreshToken: string,
}

export class AuthService {

  static async signUp({ name, email, password, phone }: ISignUpDTO) {

    const { data } = await httpClient.post('/auth/sign-up', { name, email, password, phone });

    return data;
  }


  static async confirmAccount({ email, code, }: IConfirmAccountDTO) {

    const { data } = await httpClient.post('/auth/validate-user', { email, code });

    return data;
  }

  static async resendCodeConfirmAccount({ email }: IResendConfirmAccountDTO) {

    const { data } = await httpClient.post('/auth/resend-validate-user', { email });

    return data;
  }

  static async signIn({ email, password, }: ISignInDTO) {

    const { data } = await httpClient.post('/auth/sign-in', { email, password });

    return data;
  }

  static async refreshToken(refreshToken: string): Promise<refreshTokenResponse> {

    const { data } = await httpClient.post('/auth/refresh-token', { refreshToken });

    return data;
  }

}
