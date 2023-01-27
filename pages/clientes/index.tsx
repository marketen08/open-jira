import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NextPage } from "next";
import { ClienteLista } from "../../components/clientes";
import { Layout } from "../../components/layouts";
import { FullScreenLoading } from "../../components/ui";
import { useClientes } from "../../hooks";

const Clientes:NextPage = () => {

  const { clientesResumen, isLoading } = useClientes('/clientes');

  const clientes = clientesResumen?.clientes;

  return (
    <Layout title='Clientes'>
      
      <Grid container spacing={ 2 }>

        <Typography variant='h4' padding={ 3 }>Clientes</Typography>
        
        {
          isLoading ? <FullScreenLoading /> :           
          <TableContainer component={ Paper }>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
        }

      </Grid>
      
    </Layout>
  )
}

export default Clientes;