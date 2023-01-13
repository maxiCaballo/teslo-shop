import { FC, ReactElement } from 'react';
import Head from 'next/head';
import { Navbar, SideMenu } from '../ui/';

type Props = {
  children: ReactElement;
  title: string;
  pageDescription: string;
  imageFullUrl?: string; //Cuando quiera compartir en redes sociales
};

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        {/*Etiquetas para proporcionar info a las redes sociales  */}
        <meta name="og:title" content={title} />
        <meta name="og:description" content={title} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <Navbar />

      <SideMenu />
      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px',
        }}
      >
        {children}
      </main>
      <footer>{/* TODO: Custom footer */}</footer>
    </>
  );
};
