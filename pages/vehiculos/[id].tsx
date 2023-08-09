import { FC } from 'react';
import { GetServerSideProps } from 'next'

import { Formik, Form, Field } from 'formik';
import { number, object, string } from 'yup';

import { Button, Grid, IconButton, TextField, Typography, MenuItem, FormGroup, CardContent, Card, CardHeader } from '@mui/material';
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Cliente, Vehiculo } from "../../interfaces";
import { externalApiConToken } from '../../apiAxios';
import { useRouter } from 'next/router';

interface Props {
    vehiculo: Vehiculo,
    clientes: {
        total: number,
        clientes: Cliente[]
    } 
}

export const VehiculoPage:FC<Props> = ({ vehiculo, clientes }) => {

    const router = useRouter();

    const onSave = async ( values: Vehiculo ) => {

        console.log(values.cliente);

        if ( values.id === '' ){
            // NUEVO VEHICULO
            await externalApiConToken.post(`/vehiculos`, { ...values });
            router.push(`/clientes/${ values.cliente._id }`)
        } else {
            // ACTUALIZAR VEHICULO
            await externalApiConToken.put(`/vehiculos/${ values.id }`, { ...values });
            router.push(`/clientes/${ values.cliente._id }`)
        }

    }

  return (
    
    <Layout title={ 'Detalle del vehiculo' }>
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
                        validationSchema={ object({
                            patente: string()
                                        .max(10, 'Debe de tener 10 caracteres o menos')
                                        .required('La patente es requerida'),
                            marca: string()
                                        .max(50, 'Debe de tener 50 caracteres o menos')
                                        .required('La marca es requerida'),
                            modelo: string()
                                        .max(100, 'Debe de tener 100 caracteres o menos')
                                        .required('El modelo es requerido'),
                            cliente: object()
                                    .shape({
                                        _id: string()
                                            .required('Debe seleccionar el cliente')
                                    })
                            
                        })
                    }>
                    {( { values, errors, touched, isSubmitting, isValidating  }:any ) => (
                        <Form autoComplete="off">
                            <Field
                                as={ TextField }
                                name='patente'
                                type='text'
                                fullWidth
                                label='Patente'
                                sx={{ mt: 1.5, mb: 1 }}
                                size='small'
                                error={ touched.patente && errors.patente ? true : false }
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
                                error={ touched.marca && errors.marca ? true : false }
                                helperText={ touched.marca && errors.marca && errors.marca }
                            />
                            <Field
                                as={ TextField }
                                name='modelo'
                                type='text'
                                fullWidth
                                label='Modelo'
                                sx={{ mt: 1.5, mb: 1 }}
                                size='small'
                                error={ touched.modelo && errors.modelo ? true : false }
                                helperText={ touched.modelo && errors.modelo && errors.modelo }
                            />
                            <Field 
                                as={ TextField }
                                name='cliente._id'
                                fullWidth
                                size='small'
                                label='Cliente'
                                sx={{ mt: 1.5, mb: 1 }}
                                select
                                error={ touched.cliente?._id && errors.cliente?._id ? true : false }
                                helperText={ touched.cliente?._id && errors.cliente?._id && errors.cliente._id }
                            >
                                {
                                    clientes.clientes.map( cli => 
                                           <MenuItem value={ cli.id } key={ cli.id }>{ cli.nombre }</MenuItem> 
                                    )
                                }
                            </Field>
                            <Button
                                type='submit'
                                variant='outlined'
                                color='success'
                                // disabled={ isSubmitting || isValidating }
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

export const getServerSideProps: GetServerSideProps = async ({ params, req, query }) => {

    const { id } = params as { id: string };

    let { cliente = '' } = query;

    try {
        const { data:clientes } = await externalApiConToken.get(`/clientes/`, {
            headers: {
                'x-token': req.cookies.token
            }
        });

        if ( id === 'nuevo' ) {
            const vehiculo : Vehiculo = {
                id: '',
                patente: '',
                marca: '',
                modelo: '',
                cliente: {
                    _id: cliente
                },
                activo: false,
                createdAt: 0
            }

            return {
                props: {
                    vehiculo,
                    clientes
                }
            }
        }

    
        const { data } = await externalApiConToken.get(`/vehiculos/${ id }`, {
            headers: {
                'x-token': req.cookies.token
            }
        });

        
        return {
            props: {
                vehiculo: data,
                clientes
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