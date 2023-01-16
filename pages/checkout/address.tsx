import React from 'react';

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';

const CheckoutAddressPage = () => {
  return (
    <ShopLayout title="Address page" pageDescription="Confirm direction order">
      <>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Address
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Surname" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Direction" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Direction 2 (optional)"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Postal code" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="City" variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select variant="outlined" label="Country">
                <MenuItem value={1}> Mexico</MenuItem>
                <MenuItem value={1}> Uruguay</MenuItem>
                <MenuItem value={1}> Bolivia</MenuItem>
                <MenuItem value={1}> Perú</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Phone" variant="outlined" fullWidth />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
          <Button color="secondary" className="circular-btn" size="large">
            Check order
          </Button>
        </Box>
      </>
    </ShopLayout>
  );
};

export default CheckoutAddressPage;
