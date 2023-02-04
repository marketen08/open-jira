import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Autocomplete, Button, Grid, IconButton, TextField, Typography, MenuItem, FormGroup } from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Vehiculo } from "../../interfaces";
import { VehiculosContext } from '../../context/vehiculos';
import { dateFunctions } from '../../utils';
import { externalApiConToken } from '../../apiAxios';

interface Props {
    vehiculo: Vehiculo
}

export const VehiculoPage:FC<Props> = ({ vehiculo }) => {

    const onSave = ( values: any ) => {
        console.log(values);

    }

  return (
    
    <Layout title={ 'titulo prueba' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2, padding: 2 }}
        >
            <Typography gutterBottom variant="h5" >
                Detalle del Vehiculo
            </Typography>
            <Formik
                initialValues={{ 
                    ...vehiculo
                }}
                onSubmit={ ( values ) => {
                    onSave( values );
                }}
                validationSchema={ Yup.object({
                    patente: Yup.string()
                                .max(7, 'Debe de tener 7 caracteres o menos')
                                .required('El número es requerido'),
                    marca: Yup.string()
                                .max(50, 'Debe de tener 50 caracteres o menos')
                                .required('Requerido'),
                    modelo: Yup.string()
                                .max(50, 'Debe de tener 50 caracteres o menos')
                                .required('Requerido'),
                    nombre: Yup.string()
                                .max(50, 'Debe de tener 50 caracteres o menos')
                                .required('Requerido'),
                    celular: Yup.string()
                                .max(50, 'Debe de tener 50 caracteres o menos')
                                .required('Requerido'),
                    email: Yup.string()
                                .max(100, 'Debe de tener 50 caracteres o menos')
                                .required('Requerido'),
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
                            helperText={ touched.patente && errors.patente && 'Ingrese la patente del vehículo' }
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
                            helperText={ touched.marca && errors.marca && 'Ingrese la marca del vehículo' }
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
                            helperText={ touched.modelo && errors.modelo && 'Ingrese el modelo del vehículo' }
                        />
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
                    )
                }
            </Formik>
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

export default VehiculoPage;