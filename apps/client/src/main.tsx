import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles.css';
import { ExchangeApp } from './ExchangeApp.tsx';
import { store } from './context/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ExchangeApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
