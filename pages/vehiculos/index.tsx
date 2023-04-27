import { useContext, useState } from "react";
import { Button, Card, Grid, IconButton, Paper, Table, 
        TableCell, TableContainer, TableHead, 
        TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import { VehiculoLista } from "../../components/vehiculos";
import { Layout } from "../../components/layouts";
import { FullScreenLoading } from "../../components/ui";
import { useVehiculos } from "../../hooks";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from 'next/router';
import { SocketContext } from "../../context/socket";

const Vehiculos:NextPage = () => {

  const router = useRouter();

  const [buscar, setBuscar] = useState('');

  const handleInputChangeBuscar = ({ target }: any) => {
    setBuscar(target.value);
  }

  const { vehiculosResumen, isLoading } = useVehiculos(`/vehiculos?buscar=${ buscar }`);

  const vehiculos = vehiculosResumen?.vehiculos;
  const total = vehiculosResumen?.total ? vehiculosResumen.total : -1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event : any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, vehiculos ? vehiculos.length : 0 - page * rowsPerPage);


  const handleNuevo = () => {
    router.push('/vehiculos/nuevo')
  }

  return (
    <Layout title='Vehiculos'>
      
      <Grid container padding={ 2 }>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant='h4' paddingBottom={ 2 } >Vehiculos</Typography>
          </Box>
          <Box display='flex'>
            <Typography variant='h6' paddingRight={ 1 } paddingTop={ 1 }  >
              <SearchOutlinedIcon />
            </Typography>
            <TextField 
              name='buscar'
              value={ buscar } 
              onChange={ handleInputChangeBuscar } 
              placeholder="Buscar" 
              autoComplete="off" 
              size='small' 
            />
            <Button
              variant='outlined'
              color='success'
              sx={{ ml: 1 }}
              onClick={ handleNuevo }
            >
              Nuevo
            </Button>
          </Box>
          
        </Grid>
        {
          isLoading ? <FullScreenLoading /> :      
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
              <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patente</TableCell>
                      <TableCell>Marca</TableCell>
                      <TableCell>Modelo</TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Celular</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <VehiculoLista vehiculos={ vehiculos } page={ page } rowsPerPage={ rowsPerPage } />
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={ total }
                rowsPerPage={ rowsPerPage }
                page={ page }
                onPageChange={ handleChangePage }
                onRowsPerPageChange={ handleChangeRowsPerPage }
              />
            </TableContainer>
            
          </Paper>
        }
      </Grid>
    </Layout>
  )
}

export default Vehiculos;