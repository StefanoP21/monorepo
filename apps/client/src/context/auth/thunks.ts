import { checkingCredentials, login, logout } from './authSlice';
import { checkAuth, loginUser, registerUser } from '../../api/provider';
import {
  LoginUserProps,
  RegisterUserProps,
  TokenProps,
} from '../../types/auth/user';
import { AppDispatch, AppThunk } from '../store';
import { Action, UnknownAction } from '@reduxjs/toolkit';

export const checkingAuthentication = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  };
};

export const starCreatingUser = ({
  username,
  email,
  password,
}: RegisterUserProps) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const { ok, token, errorMessage } = await registerUser({
      username,
      email,
      password,
    });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ token, email, username }));
  };
};

export const startLoginUser = ({ email, password }: LoginUserProps) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const { ok, token, username, errorMessage } = await loginUser({
      email,
      password,
    });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ token, email, username }));
  };
};

export const startCheckingAuth = ({ token }: TokenProps) => {
  return async (dispatch: AppDispatch) => {
    const { ok, username, email } = await checkAuth({ token });

    if (!ok) return dispatch(logout({ errorMessage: null }));

    dispatch(login({ token, email, username }));
  };
};
