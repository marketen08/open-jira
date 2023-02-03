import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Autocomplete, Button, Grid, IconButton, TextField, Typography, MenuItem, FormGroup, Card, CardMedia, CardContent, CardActions, Hidden } from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Pedido } from "../../interfaces";
import { PedidosContext } from '../../context/pedidos';
import { dateFunctions } from '../../utils';
import { externalApiConToken } from '../../apiAxios';

interface Props {
    pedido: Pedido
}

export const PedidoPage:FC<Props> = ({ pedido }) => {

    const [modificar, setModificar] = useState(false);
    const [cotizar, setCotizar] = useState(false);

    const onSave = async( values: Pedido ) => {
        console.log(values);
        const { id, descripcion, servicio, importe } = values;
        
        if ( modificar ) {
            const modificar = await externalApiConToken.put(`/pedidos/${ id }`, { descripcion })
        }

        if ( cotizar ) {
            values.estado = 'Cotizando'
            const cotizando = await externalApiConToken.put(`/pedidos/cotizando/${ id }`, { servicio, importe })
        }

        setModificar(false);
        setCotizar(false);

    }

    const onCotizarEnviar = async( values: Pedido ) => {
        const { id, servicio, importe } = values;

        values.estado = 'Cotizado'
        const cotizarEnviar = await externalApiConToken.put(`/pedidos/cotizarenviar/${ id }`, { servicio, importe })

        setModificar(false);
        setCotizar(false);

    }

  return (
            <Formik
                initialValues={{ 
                    ...pedido
                }}
                onSubmit={ ( values, actions ) => {
                    onSave( values );
                    actions.setSubmitting(false);
                }}
                validationSchema={ Yup.object({
                    descripcion: Yup.string()
                                .required('La descripción es requerida')
                })
            }>

                {( { values, errors, touched, isSubmitting, isValidating, setSubmitting } ) => (
                    <Layout title={ `Pedido #${ values.numero }` }>
                        <Grid
                            justifyContent='center'
                            sx={{ padding: 2 }}
                        >
                            <Typography gutterBottom variant="h5" >
                                Detalle del pedido #{ values.numero }
                            </Typography>

                            <Form autoComplete="off">
                                <Card>
                                    {/* <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                    /> */}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            { values.vehiculo.marca } { values.vehiculo.modelo }
                                        </Typography>
                                        <Typography variant="body2" color="text.primary" sx={{ padding: 0.5 }}>
                                            Propietario: { values.vehiculo.cliente.nombre }
                                        </Typography>
                                        <Typography variant="body2" color="text.primary" sx={{ padding: 0.5 }}>
                                            Celular: { values.vehiculo.cliente.celular }
                                        </Typography>
                                        <Typography variant="body2" color="text.primary" sx={{ padding: 0.5 }}>
                                            Email: { values.vehiculo.cliente.email }
                                        </Typography>
                                        <Field
                                            as={ TextField }
                                            name='descripcion'
                                            type='text'
                                            fullWidth
                                            multiline
                                            disabled={ !modificar }
                                            rows={ 6 }
                                            label='Descripción del servicio'
                                            sx={{ mt: 3, mb: 1 }}
                                            
                                            error={ touched.descripcion && errors.descripcion }
                                            helperText={ touched.descripcion && errors.descripcion && 'Ingrese la descripción del vehículo' }
                                        />
                                        <Hidden xlDown={ !cotizar && values.estado === 'Nuevo' }>
                                            <Field
                                                as={ TextField }
                                                name='servicio'
                                                type='text'
                                                fullWidth
                                                multiline
                                                disabled={ !cotizar }
                                                rows={ 6 }
                                                label='Detalle de la cotización'
                                                sx={{ mt: 3, mb: 1 }}
                                                error={ touched.descripcion && errors.descripcion }
                                                helperText={ touched.descripcion && errors.descripcion && 'Ingrese la descripción del vehículo' }
                                            />
                                            <Field
                                                as={ TextField }
                                                name='importe'
                                                type='number'
                                                fullWidth
                                                disabled={ !cotizar }
                                                label='Importe presupuestado'
                                                sx={{ mt: 3, mb: 1 }}
                                                error={ touched.descripcion && errors.descripcion }
                                                helperText={ touched.descripcion && errors.descripcion && 'Ingrese la descripción del vehículo' }
                                            />
                                        </Hidden>
                                    </CardContent>
                                    <CardActions>
                                        <Hidden xlDown={ modificar || cotizar }>
                                            <Button
                                                type='button'
                                                variant='outlined'
                                                color='primary'
                                                disabled={ isSubmitting || isValidating }
                                                onClick={ () => setModificar(true) }
                                                >
                                                <SaveOutlinedIcon />
                                                <Typography>Modificar</Typography>
                                            </Button>
                                            <Button
                                                type='button'
                                                variant='outlined'
                                                color='warning'
                                                disabled={ isSubmitting || isValidating }
                                                onClick={ () => setCotizar(true) }
                                                >
                                                <SaveOutlinedIcon />
                                                <Typography>Cotizar</Typography>
                                            </Button>
                                        </Hidden>
                                        <Hidden xlDown={ !modificar && !cotizar }>
                                            <Button
                                                type='submit'
                                                variant='outlined'
                                                color='success'
                                                disabled={ isSubmitting || isValidating }
                                                
                                            >
                                                <SaveOutlinedIcon />
                                                <Typography>Guardar</Typography>
                                            </Button>
                                            <Button
                                                type='button'
                                                variant='outlined'
                                                color='secondary'
                                                disabled={ isSubmitting || isValidating }
                                                onClick={ () => {
                                                    setModificar(false);
                                                    setCotizar(false);
                                                } }
                                                >
                                                <SaveOutlinedIcon />
                                                <Typography>Cancelar</Typography>
                                            </Button>
                                        </Hidden>
                                        <Hidden xlDown={ !cotizar }>
                                            <Button
                                                type='button'
                                                variant='outlined'
                                                color='primary'
                                                disabled={ isSubmitting || isValidating }
                                                onClick={ () => onCotizarEnviar( values ) }

                                            >
                                                <SaveOutlinedIcon />
                                                <Typography>Enviar</Typography>
                                            </Button>
                                        </Hidden>
                                    </CardActions>
                                </Card>
                            </Form>
                        </Grid>

                            <IconButton sx={{
                                position:'fixed',
                                bottom: 30,
                                right: 30,
                                border: 1,
                                color: 'red'
                            }}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                    </Layout>
                    )
                }
            </Formik>
        

  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

    const { id } = params as { id: string };

    const { data } = await externalApiConToken.get(`/pedidos/${ id }`, {
        headers: {
            'x-token': req.cookies.token
        }
    });

    if ( !data ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    return {
        props: {
            pedido: data
        }
    }
}

export default PedidoPage;