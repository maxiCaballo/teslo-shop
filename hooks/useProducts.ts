import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '@/interfaces';

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, isLoading } = useSWR<IProduct[]>(
    `/api${url}`,
    fetcher,
    config
  );

  return {
    products: data || [],
    isLoading: !error && !data,
    error,
  };
};

// * Este hook recibe como parametro una url a la que va a apuntar, puede recibir
// * opcionalmente datos de configuracion, si no los recibe manda un objeto vacío,
// * hace el llamado al endpoint y retorna un objeto con la data, isLoading que es
// * boolean que esta en true si se cumple que no hay error y no hay data y por ultimo
// * un error en caso de haberlo.

//*El fetcher podría ir como provider en el archivo _app y se podría sacar de acá
/*

   <SWRConfig 
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    </SWRConfig>
*/
