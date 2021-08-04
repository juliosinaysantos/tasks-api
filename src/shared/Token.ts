import jwt from 'jsonwebtoken';
import { config } from '../config';

export class Token {
  public static async generateAuthenticationToken(
    email: string,
  ): Promise<string> {
    const token = jwt.sign({ sub: email }, config.secretKey, {
      expiresIn: '1h',
    });
    return token;
  }

  public static async verifyAuthenticationToken(
    token: string,
  ): Promise<string> {
    const { sub } = jwt.verify(token, config.secretKey);
    return sub as string;
  }
}
