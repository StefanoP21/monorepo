import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { ExchangeRoutes } from '../app/routes/ExchangeRoutes';
import { useCheckAuth } from '../hooks';
import { CheckingAuth } from '../components';

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === 'checking') return <CheckingAuth />;
  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path="*" element={<ExchangeRoutes />} />
      ) : (
        <Route path="auth/*" element={<AuthRoutes />} />
      )}

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
