import { Navigate, Route, Routes } from 'react-router-dom';
import { ExchangePage } from '../pages/ExchangePage';

export const ExchangeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExchangePage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
