import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/styles/themes';
import '@/styles/globals.css';
import { UiProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UiProvider>
  );
}
