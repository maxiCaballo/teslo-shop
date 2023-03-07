import React, { useState } from 'react';
import { AdminLayout } from '@/components/layouts';
import { PeopleOutline } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';
import { FullScreenSpinner } from '@/components/ui';
import useSWR, { mutate } from 'swr';
import { IUser, IRole } from '../../interfaces/User';
import tesloAPI from '@/api/tesloApi';
import { useEffect } from 'react';

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>('/api/admin/users');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <FullScreenSpinner />;

  const onRollUpdated = async (userId: string, newRole: IRole) => {
    //*En este método opto por primero cambiar el estado para que sea mas rapido el cambio
    //*por la experiencia de usuario luego hago el llamado a la API, en caso de falla seteo
    //*el estado a como estaba antes.

    const previousUsers = [...users];
    const updatedUsers = users.map((user) => ({
      ...user,
      role: user._id === userId ? newRole : user.role
    }));

    setUsers(updatedUsers);

    try {
      await tesloAPI.put('/admin/users', {
        userId,
        role: newRole
      });
    } catch (error) {
      setUsers(previousUsers);
      alert('There was an error updated the user!');
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'name', headerName: 'Full name', width: 150 },
    {
      field: 'role',
      headerName: 'Role',
      description: 'Show user role',
      width: 180,
      //Nos permite obtener el parametro de la celda para poder trabajar en funcion de ello.
      renderCell(params: GridRenderCellParams) {
        return (
          <Select
            value={params.row.role}
            label='Role'
            onChange={(e) => onRollUpdated(params.row.id, e.target.value)}
            sx={{ width: '300px' }}
          >
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='SEO'>Seo</MenuItem>
            <MenuItem value='super-user'>Super User</MenuItem>
            <MenuItem value='client'>Client</MenuItem>
          </Select>
        );
      }
    }
  ];
  const rows = users!.map(({ _id: id, email, name, role }) => ({
    id,
    email,
    name,
    role
  }));

  return (
    <AdminLayout title='Users' subtitle='Users maintenance' icon={<PeopleOutline />}>
      <>
        <Grid container className='fadeIn'>
          <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]}></DataGrid>
          </Grid>
        </Grid>
      </>
    </AdminLayout>
  );
};

export default UsersPage;
