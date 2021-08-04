import { ForbiddenError, UserInputError } from 'apollo-server';
import IsEmail from 'isemail';
import { IContext } from '../../../interfaces';
import { Hash } from '../../../shared/hash';
import { Token } from '../../../shared/Token';
import { IUserInput } from '../../usersAPI';

interface ILoginResponse {
  token: string;
}

export const userMutationResolvers = {
  createUser: async (
    _root: null,
    { userInput: { email, password } }: { userInput: IUserInput },
    { dataSources }: IContext,
  ): Promise<boolean> => {
    if (!IsEmail.validate(email)) {
      throw new UserInputError('Invalid email.');
    }
    if (password.length < 5) {
      throw new UserInputError('Password must be up to 5 characters.');
    }

    // TODO: implement unique email constraint.

    let passwordHash: string;
    try {
      passwordHash = await Hash.generatePasswordHash(password);
    } catch (e) {
      console.log(`[Error on password hash generation] ${e}`);
      throw new Error('Internal Server Error');
    }

    try {
      await dataSources.usersAPI.createUser({ email, password: passwordHash });
      return true;
    } catch (e) {
      console.log(`[Error on user creation] ${e}`);
      throw new Error('Internal Server Error');
    }
  },

  loginUser: async (
    _root: null,
    { userInput: { email, password } }: { userInput: IUserInput },
    { dataSources }: IContext,
  ): Promise<ILoginResponse> => {
    if (!IsEmail.validate(email)) {
      throw new UserInputError('Invalid email.');
    }
    if (password === '') {
      throw new UserInputError('Password is required');
    }

    try {
      const user = await dataSources.usersAPI.getUserByEmail(email);
      const isValidPassword = await Hash.comparePassword(
        password,
        user?.password ?? '',
      );
      if (!user || !isValidPassword) {
        throw new ForbiddenError('Invalid credentials');
      }
    } catch (e) {
      console.log(`[Error querying the database] ${e}`);
      throw new Error('Internal Server Error');
    }

    try {
      const token = await Token.generateAuthenticationToken(email);
      return { token };
    } catch (e) {
      console.log(`[Error on token generation] ${e}`);
      throw new Error('Internal Server Error');
    }
  },
};
