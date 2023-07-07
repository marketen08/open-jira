import { useState } from 'react';
import { NextPage } from "next";
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { usePedidos } from "../../hooks/usePedidos";
import { Layout } from "../../components/layouts";
import { PedidoLista } from "../../components/pedidos";
import { FullScreenLoading } from "../../components/ui";

const Pedidos:NextPage = () => {

  const { pedidosResumen, isLoading } = usePedidos('/pedidos');

  const pedidos = pedidosResumen?.pedidos;

  const estados = [ 'Todos', 'Nuevo', 'Cotizando', 'Cotizado', 'Aprobado', 'Rechazado', 'Finalizado' ];

  const [cliente, setCliente] = useState('Todos');
  const [estado, setEstado] = useState('Nuevo');

  const onHandleChangeCliente = ( value:any) => {
    setCliente(value.target.value);
    setEstado('Todos');
  }

  const onHandleChangeEstado = ( value:any) => {
    setEstado(value.target.value);
  }

  // Obtener el id y el nombre del cliente de cada objeto
  const clientesEnPedidos = pedidosResumen?.pedidos.map(objeto => ({
    id: objeto.vehiculo.cliente._id,
    nombre: objeto.vehiculo.cliente.nombre
  }));

  
  // Eliminar objetos duplicados basados en el id del cliente
  const clientesUnicos = clientesEnPedidos?.filter((cliente, index, self) => {
    return index === self.findIndex(obj => obj.id === cliente.id);
  });

  // Ordenar los objetos alfabéticamente por el nombre del cliente
  const clientesOrdenados = clientesUnicos?.sort((a, b) => a.nombre.localeCompare(b.nombre));

  return (
    <Layout title='LISTA DE PEDIDOS'>
      
      <Grid container padding={ 2 }>
        <Grid container spacing={2}>
          <Grid item md={6}>
              <Typography variant='h4' paddingBottom={ 2 }>LISTA DE PEDIDOS</Typography>
          </Grid>
          <Grid item md={3}>
            <Box sx={{ pb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <FormControl>
                <InputLabel id="lblCliente">Cliente</InputLabel>
                <Select
                  labelId="lblCliente"
                  id="cliente"
                  value={ cliente }
                  label="Estado"
                  sx={{ width: '200px' }}
                  size='small'
                  onChange={ (value) => onHandleChangeCliente(value) }
                >
                  <MenuItem value={ 'Todos' }>Todos</MenuItem>
                  {
                    clientesOrdenados?.map( item => 
                      <MenuItem value={ item.id } key={ item.id }>{ item.nombre }</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box sx={{ pb: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <FormControl>
                <InputLabel id="lblestado">Estado</InputLabel>
                <Select
                  labelId='lblestado'
                  id='estado'
                  value={ estado }
                  label="Estado"
                  sx={{ width: '200px' }}
                  size='small'
                  onChange={ (value) => onHandleChangeEstado(value) }
                >
                  {
                    estados.map( item => 
                      <MenuItem value={ item } key={ item }>{ item }</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
                
        
        {
          isLoading ? <FullScreenLoading /> : 
        <TableContainer component={ Paper } sx={{ maxHeight: 440 }}>
        <Table size='small' sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Patente</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <PedidoLista pedidos={ pedidos } cliente={ cliente } estado={ estado } />
        </Table>
        </TableContainer>
      }
      </Grid>
      
    </Layout>
  )
}


export default Pedidos;