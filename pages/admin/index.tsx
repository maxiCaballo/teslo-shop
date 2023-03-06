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
import { Grid } from '@mui/material';
import { DashboardCard } from '@/components/admin/DashboardCard';

const DashboardPage = () => {
  return (
    <>
      <AdminLayout title='Dashboard' subtitle='gereral statistics' icon={<DashboardOutlined />}>
        <Grid container spacing={2}>
          <DashboardCard
            title='3'
            subtitle='Total orders'
            icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title='3'
            subtitle='Paid orders'
            icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title='3'
            subtitle='Pending orders'
            icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard title='3' subtitle='Clients' icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />} />

          <DashboardCard
            title='3'
            subtitle='Products'
            icon={<CategoryOutlined color='error' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title='3'
            subtitle='Out of stock'
            icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
          />
          <DashboardCard
            title='3'
            subtitle='Low inventory:'
            icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
          />

          <DashboardCard
            title='3'
            subtitle='Update in:'
            icon={<AccessTimeFilledOutlined color='secondary' sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </AdminLayout>
    </>
  );
};

export default DashboardPage;
