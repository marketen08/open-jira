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

    const onSave = ( values: any ) => {
        console.log(values);

    }

  return (
    
    
            <Formik
                initialValues={{ 
                    ...pedido
                }}
                onSubmit={ ( values ) => {
                    onSave( values );
                }}
                validationSchema={ Yup.object({
                    descripcion: Yup.string()
                                .required('La descripción es requerida')
                })
            }>

                {( { values, errors, touched, isSubmitting, isValidating } ) => (
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
                                            Propietario: { values.vehiculo.nombre }
                                        </Typography>
                                        <Typography variant="body2" color="text.primary" sx={{ padding: 0.5 }}>
                                            Celular: { values.vehiculo.celular }
                                        </Typography>
                                        <Typography variant="body2" color="text.primary" sx={{ padding: 0.5 }}>
                                            Email: { values.vehiculo.email }
                                        </Typography>
                                        <Field
                                            as={ TextField }
                                            name='descripcion'
                                            type='text'
                                            fullWidth
                                            multiline
                                            rows={ 6 }
                                            label='Descripción del servicio'
                                            sx={{ mt: 3, mb: 1 }}
                                            error={ touched.descripcion && errors.descripcion }
                                            helperText={ touched.descripcion && errors.descripcion && 'Ingrese la descripción del vehículo' }
                                        />
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            type='submit'
                                            variant='outlined'
                                            color='primary'
                                            disabled={ isSubmitting || isValidating }
                                        >
                                            <SaveOutlinedIcon />
                                            <Typography>Modificar</Typography>
                                        </Button>
                                        <Button
                                            type='submit'
                                            variant='outlined'
                                            color='warning'
                                            disabled={ isSubmitting || isValidating }
                                        >
                                            <SaveOutlinedIcon />
                                            <Typography>Preparar</Typography>
                                        </Button>
                                        <Hidden>

                                            <Button
                                                type='submit'
                                                variant='outlined'
                                                color='success'
                                                disabled={ isSubmitting || isValidating }
                                                
                                                >
                                                <SaveOutlinedIcon />
                                                <Typography>Guardar</Typography>
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