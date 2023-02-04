import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { NextPage } from "next";
import { ClienteLista } from "../../components/clientes";
import { Layout } from "../../components/layouts";
import { FullScreenLoading } from "../../components/ui";
import { useClientes } from "../../hooks";

const Clientes:NextPage = () => {

  const { clientesResumen, isLoading } = useClientes('/clientes');

  const clientes = clientesResumen?.clientes;

  const handleChange = () => {

  }

  return (
    <Layout title='Clientes'>
      
      <Grid container padding={ 2 }>

        <Typography variant='h4' paddingBottom={ 2 } >Clientes</Typography>
        {
          isLoading ? <FullScreenLoading /> :      
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>     
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table>
                  <TableHead>
                    <TableRow>
                        <TableCell>Nombre del cliente</TableCell>
                        <TableCell>Código</TableCell>
                        <TableCell>Razon Social</TableCell>
                        <TableCell>Condición Iva</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <ClienteLista clientes={ clientes } />
                  
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={6}
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