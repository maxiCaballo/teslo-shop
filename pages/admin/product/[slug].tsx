import React, { FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AdminLayout } from '../../../components/layouts';
import { IGender, IProduct, ISize, ITypes } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { convert_to_teslo_slug } from '@/utils';

const validTypes: ITypes[] = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender: IGender[] = ['men', 'women', 'kid', 'unisex'];
const validSizes: ISize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: ITypes;
  gender: IGender;
}

interface Props {
  product: IProduct;
}
//Yup Schema
const FormSchema = yup.object().shape({
  title: yup.string().required('Required field').min(2, 'Min length of 2'),
  description: yup.string().required('Required field'),
  inStock: yup.number().typeError('Please enter a valid number').required('Required field').min(0, 'Min value 0'),
  price: yup.number().typeError('Please enter a valid number').required('Required field').min(0, 'Min value 0'),
  slug: yup.string().required('Required field').matches(/^\S+$/, `Can't contain an empty space`)
  //   tags: yup.string()
  // type:,
  // gender:,
});

const ProductAdminPage: FC<Props> = ({ product }) => {
  const [tagInputValue, setTagInputValue] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues, //*Puedo obtener el valor de los campos actuales del form
    setValue //*No renderiza el componente a menos que se lo especifique
  } = useForm<FormData>({
    defaultValues: product,
    resolver: yupResolver(FormSchema)
  });

  //*Efecto para cambiar el input slug en función del title
  useEffect(() => {
    const subscription: Subscription = watch((value, { name }) => {
      if (name === 'title') {
        const newSlug = convert_to_teslo_slug(value.title) || '';
        setValue('slug', newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  //*Efecto para añadir tag al producto
  useEffect(() => {
    if (tagInputValue[tagInputValue.length - 1] === ' ') {
      onNewTag();
      setTagInputValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagInputValue]);

  const onSubmit = (form: FormData) => {
    console.log(form);
  };

  const onChangeSize = (size: ISize) => {
    const currentSizes: ISize[] = getValues('sizes');
    if (currentSizes.includes(size))
      return setValue(
        'sizes',
        currentSizes.filter((value) => value !== size),
        { shouldValidate: true }
      );
    else setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const onNewTag = () => {
    if (tagInputValue === ' ' || tagInputValue === '') return;

    const newTag = tagInputValue.trim().toLocaleLowerCase();
    console.log(newTag);
    setTagInputValue('');

    const currentTags = Array.from(getValues('tags'));
    currentTags.push(newTag);

    const newTags = Array.from(new Set(currentTags));
    setValue('tags', newTags, { shouldValidate: true });
  };
  const onDeleteTag = (tag: string) => {
    const newTags = getValues('tags').filter((item) => item !== tag);
    setValue('tags', newTags, { shouldValidate: true });
  };

  return (
    <AdminLayout title={'Product'} subtitle={`Editing: ${product.title}`} icon={<DriveFileRenameOutline />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button color='secondary' startIcon={<SaveOutlined />} sx={{ width: '150px' }} type='submit'>
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Title'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label='Description'
              variant='filled'
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label='Stock'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock')}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label='Price'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('price')}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={({ target }) => {
                  const { value } = target as { value: ITypes };
                  //El shouldValidate: true es para que re renderize el componente
                  //y quede seleccionada la opción
                  setValue('type', value, { shouldValidate: true });
                }}
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color='secondary' />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={({ target }) => {
                  const { value } = target as { value: IGender };
                  setValue('gender', value, { shouldValidate: true });
                }}
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color='secondary' />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Sizes</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox checked={getValues('sizes').includes(size)} />}
                  label={size}
                  value={tagInputValue}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Slug - URL'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug')}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label='Tags'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              helperText='Press [spacebar] to add'
              value={tagInputValue}
              onChange={({ target }) => setTagInputValue(target.value)}
              onKeyUp={({ code }) => (code === 'Space' ? onNewTag() : false)}
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0
              }}
              component='ul'
            >
              {getValues('tags').map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color='primary'
                    size='small'
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display='flex' flexDirection='column'>
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button color='secondary' fullWidth startIcon={<UploadOutlined />} sx={{ mb: 3 }}>
                Upload image
              </Button>

              <Chip label='Almost 2 images' color='error' variant='outlined' sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia component='img' className='fadeIn' image={`/products/${img}`} alt={img} />
                      <CardActions>
                        <Button fullWidth color='error'>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query;

  const product = await dbProducts.getProductBySlug(slug.toString());

  if (!product) {
    return {
      redirect: {
        destination: '/admin/product',
        permanent: false
      }
    };
  }

  return {
    props: {
      product
    }
  };
};

export default ProductAdminPage;