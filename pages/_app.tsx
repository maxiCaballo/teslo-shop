import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/styles/themes';
import '@/styles/globals.css';
import { UiProvider, CartProvider, AuthProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
