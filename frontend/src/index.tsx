import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
