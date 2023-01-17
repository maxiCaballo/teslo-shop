import { ReactElement } from 'react';
import Head from 'next/head';

import { Box } from '@mui/material';

interface Props {
  children: ReactElement;
  title: string;
  pageDescription: string;
}

export const AuthLayout = ({
  children,
  title,
  pageDescription,
}: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <main>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="calc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
