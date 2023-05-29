import { FC } from 'react';
import { GetServerSideProps } from 'next'

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Button, Grid, 
        TextField, Typography, 
        Card, CardContent, CardActions, 
        Box } from "@mui/material";
import { Layout } from "../../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Pedido } from "../../../interfaces";
import { externalApiConToken } from '../../../apiAxios';
import { Vehiculo } from '../../../interfaces/vehiculo';
import { useRouter } from 'next/router';

interface Props {
    vehiculo: Vehiculo
}

interface PedidoGuardar {
    descripcion: string,
    vehiculo: Vehiculo
}

export const PedidoNuevoPage:FC<Props> = ({ vehiculo }) => {

    const router = useRouter();

    const onSave = async( values: PedidoGuardar ) => {
        // console.log(values);
        // const { id, descripcion, vehiculo } = values;
        const data: PedidoGuardar = {
            descripcion: values.descripcion,
            vehiculo
        }
        const { data:nuevoPedido } = await externalApiConToken.post(`/pedidos/`, { ...data })

        router.push(`/pedidos/${ nuevoPedido.id }`);

    }

    const onCancelar = () => {
        router.push(`/pedidos/`);
    }

    return (
            <Formik
                initialValues={{ 
                    vehiculo,
                    descripcion: ''
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
                    <Layout title={ `Nuevo pedido` }>
                        <Grid
                            justifyContent='center'
                            sx={{ padding: 2 }}
                        >
                            <Form autoComplete="off">
                                <Card sx={{ backgroundColor: 'whitesmoke'}}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" >
                                            Detalle del nuevo pedido
                                        </Typography>
                                        <Grid container sx={{ marginTop: 2 }} >
                                            <Grid item xs={ 6 } sm={ 6 } md={ 6 }>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    { values.vehiculo.marca } { values.vehiculo.modelo }
                                                </Typography>
                                                {
                                                    (typeof values.vehiculo.cliente === 'object' ) &&
                                                    <>
                                                        <Typography variant="body2" color="text.primary" sx={{ padding: 0.5 }}>
                                                            Propietario: { values.vehiculo.cliente.nombre }
                                                        </Typography>
                                                        <Typography variant="body2" color="text.primary" sx={{ padding: 0.5 }}>
                                                            Celular: { values.vehiculo.cliente.celular }
                                                        </Typography>
                                                        <Typography variant="body2" color="text.primary" sx={{ padding: 0.5 }}>
                                                            Email: { values.vehiculo.cliente.email }
                                                        </Typography>
                                                    </>
                                                }
                                            </Grid>
                                        </Grid>
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
                                        <Box>
                                            <Button
                                                type='submit'
                                                variant='outlined'
                                                color='success'
                                                disabled={ isSubmitting || isValidating }
                                                sx={{ margin: 1 }}
                                            >
                                                <SaveOutlinedIcon />
                                                <Typography>Guardar</Typography>
                                            </Button>
                                            <Button
                                                type='button'
                                                variant='outlined'
                                                color='secondary'
                                                disabled={ isSubmitting || isValidating }
                                                onClick={ onCancelar }
                                                sx={{ margin: 1 }}
                                            >
                                                <SaveOutlinedIcon />
                                                <Typography>Cancelar</Typography>
                                            </Button>
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Form>
                        </Grid>
                    </Layout>
                    )
                }
            </Formik>
        

  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

    const { id } = params as { id: string };

    const { data } = await externalApiConToken.get(`/vehiculos/${ id }`, {
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
            vehiculo: data
        }
    }
}

export default PedidoNuevoPage;