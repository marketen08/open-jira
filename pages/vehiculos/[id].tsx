import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Autocomplete, Button, Grid, IconButton, TextField, Typography, MenuItem, FormGroup } from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Vehiculo } from "../../interfaces";
import { VehiculosContext } from '../../context';
import { dateFunctions } from '../../utils';
import { externalApiConToken } from '../../apiAxios';

interface Props {
    vehiculo: Vehiculo
}

export const VehiculoPage:FC<Props> = ({ vehiculo }) => {

    // const { updateVehiculo } = useContext(VehiculosContext);

    // const { codigo, tipoDeDocumento, numero, razonSocial, nombre, condicionIva, domicilio, provincia, localidad, telefono, email } = vehiculo;

    const onSave = ( values: any ) => {
        console.log(values);

    }

  return (
    
    <Layout title={ 'titulo prueba' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2 }}
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
                    numero: Yup.string()
                                .max(20, 'Debe de tener 20 caracteres o menos')
                                .required('El número es requerido'),
                    nombre: Yup.string()
                                .max(50, 'Debe de tener 50 caracteres o menos')
                                .required('Requerido'),
                    razonSocial: Yup.string()
                                .max(20, 'Debe de tener 20 caracteres o menos')
                                .required('La razon social es requerida'),
                })
            }>

                {( { values, errors, touched, isSubmitting, isValidating } ) => (
                    <Form autoComplete="off">
                        <Field
                            as={ TextField }
                            name='codigo'
                            type='text'
                            fullWidth
                            disabled
                            label='Código'
                            sx={{ mt: 1.5, mb: 1 }}
                            size='small'
                        />
                        
                        
                       
                        <Field
                            as={ TextField }
                            name='localidad'
                            type='text'
                            fullWidth
                            label='Localidad'
                            sx={{ mt: 1.5, mb: 1 }}
                            size='small'
                        />
                        <Field
                            as={ TextField }
                            name='telefono'
                            type='text'
                            fullWidth
                            label='telefono'
                            sx={{ mt: 1.5, mb: 1 }}
                            size='small'
                        />
                        <Field
                            as={ TextField }
                            name='email'
                            type='text'
                            fullWidth
                            label='Email'
                            sx={{ mt: 1.5, mb: 1 }}
                            size='small'
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { id } = ctx.params as { id: string };

    const { data:vehiculo } = await externalApiConToken.get(`/vehiculos/${ id }`);

    if ( !vehiculo ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    return {
        props: {
            vehiculo
        }
    }
}

export default VehiculoPage;