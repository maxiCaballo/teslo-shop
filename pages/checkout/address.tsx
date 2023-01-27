'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { GetServerSideProps } from 'next';
// import { jwt } from '@/utils';

import { CartContext } from '../../context/cart/CartContext';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || ' ',
    zipCode: Cookies.get('zipCode') || '',
    city: Cookies.get('city') || '',
    phone: Cookies.get('phone') || '',
    country: Cookies.get('country') || ''
  };
};

const CheckoutAddressPage = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies()
  });

  const onAddressRegister: SubmitHandler<FormData> = (data) => {
    updateAddress(data);
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout title='Address page' pageDescription='Confirm direction order'>
      <>
        <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
          Address
        </Typography>

        <form onSubmit={handleSubmit(onAddressRegister)}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label='FirstName'
                variant='outlined'
                fullWidth
                {...register('firstName', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: 'Min length 2'
                  }
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            {/* Lastname */}
            <Grid item xs={12} sm={6}>
              <TextField
                label='Lastname'
                variant='outlined'
                fullWidth
                {...register('lastName', {
                  required: 'This field is required',
                  minLength: {
                    value: 2,
                    message: 'Min length 2'
                  }
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            {/* Address */}
            <Grid item xs={12} sm={6}>
              <TextField
                label='Address'
                variant='outlined'
                fullWidth
                {...register('address', {
                  required: 'This field is required'
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            {/* Address2 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label='Direction 2 (optional)'
                variant='outlined'
                fullWidth
                {...register('address2')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            {/* zipCode */}
            <Grid item xs={12} sm={6}>
              <TextField
                label='Postal code'
                variant='outlined'
                fullWidth
                {...register('zipCode', {
                  required: 'This field is required'
                })}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            </Grid>
            {/* City */}
            <Grid item xs={12} sm={6}>
              <TextField
                label='City'
                variant='outlined'
                fullWidth
                {...register('city', {
                  required: 'This field is required'
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>
            {/* Country */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  variant='outlined'
                  label='Country'
                  defaultValue='CRI'
                  {...register('country', {
                    required: 'This field is required'
                  })}
                  error={!!errors.country}
                  // helperText={errors.country?.message}
                >
                  {countries.map(({ name, code }) => (
                    <MenuItem value={code} key={code}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                label='Phone'
                variant='outlined'
                fullWidth
                {...register('phone', {
                  required: 'This field is required'
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>

          <Box display='flex' justifyContent='center' sx={{ mt: 5 }}>
            <Button color='secondary' className='circular-btn' size='large' type='submit'>
              Check order
            </Button>
          </Box>
        </form>
      </>
    </ShopLayout>
  );
};
export const countries = [
  {
    name: 'Costa Rica',
    code: 'CRI'
  },
  {
    name: 'Argentina',
    code: 'ARG'
  },
  {
    name: 'Venezuela',
    code: 'VEN'
  },
  {
    name: 'Guatemala',
    code: 'GTM'
  },
  {
    name: 'Mexico',
    code: 'MEX'
  },
  {
    name: 'Belice',
    code: 'BLZ'
  },
  {
    name: 'Puerto Rico',
    code: 'PRI'
  },
  {
    name: 'Ecuador',
    code: 'ECU'
  },
  {
    name: 'Panamá',
    code: 'PAN'
  },
  {
    name: 'Honduras',
    code: 'HND'
  },
  {
    name: 'Bolivia',
    code: 'BOL'
  },
  {
    name: 'El Salvador',
    code: 'SLV'
  },
  {
    name: 'Peru',
    code: 'PER'
  },
  {
    name: 'Uruguay',
    code: 'URY'
  },
  {
    name: 'Colombia',
    code: 'COL'
  },
  {
    name: 'Republica Dominicana',
    code: 'DOM'
  },
  {
    name: 'España',
    code: 'ESP'
  },
  {
    name: 'Paraguay',
    code: 'PRY'
  },
  {
    name: 'Chile',
    code: 'CHL'
  },
  {
    name: 'Cuba',
    code: 'CUB'
  },
  {
    name: 'Nicaragua',
    code: 'NIC'
  }
];

export default CheckoutAddressPage;

//*Al usar un middleware para saber si está autenticado no es necesario usar getServerSideProps
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { token = '' } = ctx.req.cookies;
//   let isValidToken = false;
//   console.log('entré acá');

//   try {
//     await jwt.checkJWT(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken)
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address', //Para que el login sepa desde donde viene
//         permanent: false
//       }
//     };

//   return {
//     props: {}
//   };
// };
