import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../context/store';
import { useEffect } from 'react';
import { startCheckingAuth } from '../context/auth/thunks';

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(startCheckingAuth({ token }) as any);
  }, []);

  return status;
};
