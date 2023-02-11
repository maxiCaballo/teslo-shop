import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/styles/themes';
import '@/styles/globals.css';
import { UiProvider, CartProvider, AuthProvider } from '@/context';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
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
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
