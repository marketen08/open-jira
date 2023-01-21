import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NextPage } from "next";
import { PedidoLista } from "../../components/pedidos";
import { Layout } from "../../components/layouts";

const Pedidos:NextPage = () => {
  return (
    <Layout title='Pedidos'>
      
      <Grid container spacing={ 2 }>

        <Typography variant='h4' padding={ 3 }>Pedidos</Typography>
        
        <TableContainer component={ Paper }>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Número</TableCell>
                <TableCell>Vehículo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
            </TableRow>
            </TableHead>
            <PedidoLista  />
        </Table>
        </TableContainer>

      </Grid>
      
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from 'next'
import externalApi from '../../apiAxios/externalApi';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const resp2 = await externalApi.get('/pedidos');

  // console.log(resp2.data.pedidos);

  return {
    props: {
      
    }
  }
}
export default Pedidos;