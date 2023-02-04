import { FC } from 'react';
import { GetServerSideProps } from 'next'

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Autocomplete, Button, Grid, IconButton, TextField, Typography, MenuItem, FormGroup, CardContent, Card, CardHeader } from '@mui/material';
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Cliente, Vehiculo } from "../../interfaces";
import { externalApiConToken } from '../../apiAxios';

interface Props {
    vehiculo: Vehiculo,
    clientes: Cliente[]
}

export const VehiculoPage:FC<Props> = ({ vehiculo, clientes }) => {

    // const { updateVehiculo } = useContext(VehiculosContext);
    console.log(clientes);

    const onSave = ( values: any ) => {
        console.log(values);

    }

  return (
    
    <Layout title={ 'Detalle del Vehiculo' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2, padding: 2 }}
        >
            <Card>
                <CardHeader title="Detalle del Vehiculo" sx={{ backgroundColor: 'gray', color: 'white'}} />
                <CardContent>
                    <Formik
                        initialValues={{ 
                            ...vehiculo
                        }}
                        onSubmit={ ( values ) => {
                            onSave( values );
                        }}
                        validationSchema={ Yup.object({
                            patente: Yup.string()
                                        .max(10, 'Debe de tener 10 caracteres o menos')
                                        .required('La patente es requerida'),
                            marca: Yup.string()
                                        .max(50, 'Debe de tener 50 caracteres o menos')
                                        .required('La marca es requerida'),
                            modelo: Yup.string()
                                        .max(100, 'Debe de tener 100 caracteres o menos')
                                        .required('El modelo es requerido'),
                            cliente: Yup.string()
                                        .required('El cliente es requerido'),
                        })
                    }>
                    {( { values, errors, touched, isSubmitting, isValidating } ) => (
                        <Form autoComplete="off">
                            <Field
                                as={ TextField }
                                name='patente'
                                type='text'
                                fullWidth
                                label='Patente'
                                sx={{ mt: 1.5, mb: 1 }}
                                size='small'
                                error={ touched.patente && errors.patente }
                                helperText={ touched.patente && errors.patente && errors.patente }
                            />
                            <Field
                                as={ TextField }
                                name='marca'
                                type='text'
                                fullWidth
                                label='Marca'
                                sx={{ mt: 1.5, mb: 1 }}
                                size='small'
                                error={ touched.marca && errors.marca }
                                helperText={ touched.marca && errors.marca&& errors.marca }
                            />
                            <Field
                                as={ TextField }
                                name='modelo'
                                type='text'
                                fullWidth
                                label='Modelo'
                                sx={{ mt: 1.5, mb: 1 }}
                                size='small'
                                error={ touched.modelo && errors.modelo }
                                helperText={ touched.modelo && errors.modelo&& errors.modelo }
                            />
                            <Field 
                                as={ TextField }
                                name='cliente._id'
                                fullWidth
                                size='small'
                                label='Cliente'
                                sx={{ mt: 1.5, mb: 1 }}
                                select
                                >
                                {
                                    clientes.map( cli => <MenuItem value={ cli.id } key={ cli.id }>{ cli.nombre }</MenuItem> )
                                }
                            </Field>
                            <Button
                                type='submit'
                                variant='outlined'
                                color='success'
                                disabled={ isSubmitting || isValidating }
                            >
                                <SaveOutlinedIcon />
                                <Typography>Guardar</Typography>
                                
                            </Button>
                        </Form>
                    )}
                    </Formik>
                </CardContent>
            </Card>
        </Grid>

        <IconButton sx={{
            position:'fixed',
            bottom: 30,
            right: 30,
            background: 'error.dark'
        }}>
            <DeleteOutlineOutlinedIcon />
        </IconButton>
    </Layout>

  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

    const { id } = params as { id: string };

    try {
        const { data:vehiculo } = await externalApiConToken.get(`/vehiculos/${ id }`, {
            headers: {
                'x-token': req.cookies.token
            }
        });
    
        const { data:clientes } = await externalApiConToken.get(`/clientes`, {
            headers: {
                'x-token': req.cookies.token
            }
        });

        return {
            props: {
                vehiculo,
                clientes: clientes.clientes
            }
        }

    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
}

export default VehiculoPage;