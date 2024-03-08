import axios from 'axios';
import { API_URL } from './config';
import {
  LoginUserProps,
  RegisterUserProps,
  TokenProps,
} from '../types/auth/user';

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterUserProps) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });

    const { token } = response.data;

    return {
      ok: true,
      username,
      email,
      token,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.response.data.message,
    };
  }
};

export const loginUser = async ({ email, password }: LoginUserProps) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { token, username } = response.data;

    return {
      ok: true,
      token,
      username,
      email,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.response.data.message,
    };
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.response.data.message,
    };
  }
};

export const checkAuth = async ({ token }: TokenProps) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `token ${token}` },
    });

    const { username, email } = response.data;

    return {
      ok: true,
      token,
      username,
      email,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.response.data.message,
    };
  }
};
