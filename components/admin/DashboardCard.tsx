import React, { FC } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { CreditCardOffOutlined } from '@mui/icons-material';

type Props = {
  title: number;
  subtitle: string;
  icon: JSX.Element;
};

export const DashboardCard: FC<Props> = ({ title, subtitle, icon }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {icon}
        </CardContent>

        <CardContent sx={{ display: 'flex', flex: '1 0 auto', flexDirection: 'column' }}>
          <Typography variant='h3'>{title}</Typography>
          <Typography>{subtitle}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
