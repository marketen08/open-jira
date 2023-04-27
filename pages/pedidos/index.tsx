import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NextPage } from "next";
import { PedidoLista } from "../../components/pedidos";
import { Layout } from "../../components/layouts";
import { usePedidos } from "../../hooks/usePedidos";
import { FullScreenLoading } from "../../components/ui";

const Pedidos:NextPage = () => {

  const { pedidosResumen, isLoading } = usePedidos('/pedidos');

  const pedidos = pedidosResumen?.pedidos;

  return (
    <Layout title='Pedidos'>
      
      <Grid container padding={ 2 }>

        <Typography variant='h4' paddingBottom={ 2 }>Pedidos</Typography>
        {
          isLoading ? <FullScreenLoading /> : 
        <TableContainer component={ Paper } sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Patente</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <PedidoLista pedidos={ pedidos }/>
        </Table>
        </TableContainer>
      }
      </Grid>
      
    </Layout>
  )
}


export default Pedidos;