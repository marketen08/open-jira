import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NextPage } from "next";
import { VehiculoLista } from "../../components/vehiculos";
import { Layout } from "../../components/layouts";
import { useVehiculos } from "../../hooks/useVehiculos";
import { FullScreenLoading } from "../../components/ui";

const Vehiculos:NextPage = () => {

  const { vehiculosResumen, isLoading } = useVehiculos('/vehiculos');

  const vehiculos = vehiculosResumen?.vehiculos;

  return (
    <Layout title='Vehiculos'>
      
      <Grid container padding={ 2 }>

        <Typography variant='h4' paddingBottom={ 2 }>Vehiculos</Typography>
        {
          isLoading ? <FullScreenLoading /> : 
        <TableContainer component={ Paper } sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Patente</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Email</TableCell>
            </TableRow>
            </TableHead>
            <VehiculoLista vehiculos={ vehiculos }/>
        </Table>
        </TableContainer>
      }
      </Grid>
      
    </Layout>
  )
}


export default Vehiculos;