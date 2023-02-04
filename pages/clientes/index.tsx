import { useState } from "react";
import { Card, Grid, Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import { ClienteLista } from "../../components/clientes";
import { Layout } from "../../components/layouts";
import { FullScreenLoading } from "../../components/ui";
import { useClientes } from "../../hooks";

const Clientes:NextPage = () => {



  const [buscar, setBuscar] = useState('');

  const handleInputChangeBuscar = ({ target }: any) => {
    setBuscar(target.value);
  }

  const { clientesResumen, isLoading } = useClientes(`/clientes?buscar=${ buscar }`);

  const clientes = clientesResumen?.clientes;
  const total = clientesResumen?.total ? clientesResumen.total : -1;

  const handleChange = () => {

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
            <Typography variant='h6' paddingRight={ 1 } paddingTop={ 0.5 } >Buscar</Typography>
            <TextField 
              name='buscar'
              value={ buscar } 
              onChange={ handleInputChangeBuscar } 
              placeholder="Buscar" 
              autoComplete="off" 
              size='small' 
            />
          </Box>
          
        </Grid>
        {
          isLoading ? <FullScreenLoading /> :      
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Código</TableCell>
                      <TableCell>Nombre del cliente</TableCell>
                      <TableCell>Documento</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Celular</TableCell>
                      <TableCell>Domicilio</TableCell>
                    </TableRow>
                  </TableHead>
                  <ClienteLista clientes={ clientes } />
                  
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={ total }
              rowsPerPage={10}
              page={0}
              onPageChange={ handleChange }
              onRowsPerPageChange={ handleChange }
            />
          </Paper>
        }

      </Grid>
      
    </Layout>
  )
}

export default Clientes;