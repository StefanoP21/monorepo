import { User } from '../schemas/user.schema';

export type UserResponseType = Omit<User, 'password'> & { token: string };
