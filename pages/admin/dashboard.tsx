import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { AdminLayout } from '../../components/layouts/AdminLayout';
import {
  AccessTimeFilledOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { DashboardCard } from '@/components/admin/DashboardCard';
import { IAdminDashboard } from '../../interfaces/Admin';
import { FullScreenSpinner } from '@/components/ui';

const DashboardPage = () => {
  const { data, error } = useSWR<IAdminDashboard>('/api/admin/dashboard', { refreshInterval: 30 * 1000 });
  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => {
      clearInterval(interval); //Si cambio de page el intervalo se seguiría ejecutando sinó
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data && !error) return <FullScreenSpinner />;

  if (error) {
    console.log(error);
    <Typography>There was an error loading data</Typography>;
  }

  const { orders, products, totalClients } = data!;

  return (
    <>
      <AdminLayout title='Dashboard' subtitle='gereral statistics' icon={<DashboardOutlined />}>
        <Grid container spacing={2}>
          <DashboardCard
            title={orders.total}
            subtitle='Total orders'
            icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title={orders.paid}
            subtitle='Paid orders'
            icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title={orders.pending}
            subtitle='Pending orders'
            icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title={totalClients}
            subtitle='Clients'
            icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title={products.total}
            subtitle='Products'
            icon={<CategoryOutlined color='error' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title={products.outOfStock}
            subtitle='Out of stock'
            icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
          />
          <DashboardCard
            title={products.lowInventory}
            subtitle='Low inventory:'
            icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title={refreshIn}
            subtitle='Update in:'
            icon={<AccessTimeFilledOutlined color='secondary' sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </AdminLayout>
    </>
  );
};

export default DashboardPage;
