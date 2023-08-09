import { useContext, useState } from "react";
import { Button, Card, Grid, IconButton, Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import { ClienteLista } from "../../components/clientes";
import { Layout } from "../../components/layouts";
import { FullScreenLoading } from "../../components/ui";
import { useClientes } from "../../hooks";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRouter } from 'next/router';

const Clientes:NextPage = () => {

  const router = useRouter();

  const { numero = '', celular = '' } = router.query;

  const [buscar, setBuscar] = useState('');

  const handleInputChangeBuscar = ({ target }: any) => {
    setBuscar(target.value);
  }

  const { clientesResumen, isLoading } = useClientes(`/clientes?buscar=${ buscar }&numero=${ numero }&celular=${ celular }`);

  const clientes = clientesResumen?.clientes;
  const total = clientesResumen?.total ? clientesResumen.total : -1;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event : any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNuevo = () => {
    router.push('/clientes/nuevo');
  }

  return (
    <Layout title='Clientes'>
      
      <Grid container padding={ 2 }>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant='h4' paddingBottom={ 2 } >Clientes</Typography>
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
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre del cliente</TableCell>
                    <TableCell>Documento</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Celular</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <ClienteLista clientes={ clientes } page={ page } rowsPerPage={ rowsPerPage } />
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

export default Clientes;