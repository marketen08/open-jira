import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { Autocomplete, Button, Grid, IconButton, TextField, Typography, MenuItem, FormGroup } from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Cliente, ClienteCondicionIva, ClienteTipoDeDocumento } from "../../interfaces";
import { ClientesContext } from '../../context/clientes';
import { dateFunctions } from '../../utils';
import { externalApiConToken } from '../../apiAxios';
import Cookies from 'js-cookie';

const validTipoDocumento: ClienteTipoDeDocumento[] = [ 'CUIT', 'CUIL', 'DNI', 'Otros' ]
const validCondicionIva: ClienteCondicionIva[] = [  'IVA Responsable Inscripto',
                                                    'Responsable Monotributo',
                                                    'IVA Sujeto Exento',
                                                    'Cliente del Exterior',
                                                    'Consumidor Final',
                                                    'IVA No Alcanzado' ];

interface Props {
    cliente: Cliente
}

export const ClientePage:FC<Props> = ({ cliente }) => {

    // const { updateCliente } = useContext(ClientesContext);

    // const { codigo, tipoDeDocumento, numero, razonSocial, nombre, condicionIva, domicilio, provincia, localidad, telefono, email } = cliente;

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
                Detalle del Cliente
            </Typography>
            <Formik
                initialValues={{ 
                    ...cliente
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
                            name='tipoDeDocumento'
                            fullWidth
                            size='small'
                            label='Tipo de Documento'
                            sx={{ mt: 1.5, mb: 1 }}
                            select
                        >
                            {
                                validTipoDocumento.map( cond => <MenuItem value={ cond } key={ cond }>{ cond }</MenuItem> )
                            }
                        </Field>
                        <FormGroup>
                            <Field
                                as={ TextField }
                                name='numero'
                                type='text'
                                fullWidth
                                label='Número'
                                sx={{ mt: 1.5, mb: 1 }}
                                size='small'
                                error={ touched.numero && errors.numero }
                                helperText={ touched.numero && errors.numero && 'Ingrese el número' }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                as={ TextField }
                                name='razonSocial'
                                type='text'
                                fullWidth
                                label='Razon Social'
                                sx={{ mt: 1.5, mb: 1 }}
                                size='small'
                                error={ touched.razonSocial && errors.razonSocial }
                                helperText={ touched.razonSocial && errors.razonSocial && 'Ingrese la razon social' }
                            />
                        </FormGroup>
                        <Field
                            as={ TextField }
                            name='nombre'
                            type='text'
                            fullWidth
                            label='Nombre'
                            sx={{ mt: 1.5, mb: 1 }}
                            size='small'
                        />
                        <Field 
                            as={ TextField }
                            name='condicionIva'
                            fullWidth
                            size='small'
                            label='Condición Iva'
                            sx={{ mt: 1.5, mb: 1 }}
                            select
                        >
                            {
                                validCondicionIva.map( cond => <MenuItem value={ cond } key={ cond }>{ cond }</MenuItem> )
                            }
                        </Field>
                        <Field
                            as={ TextField }
                            name='domicilio'
                            type='text'
                            fullWidth
                            label='Domicilio'
                            sx={{ mt: 1.5, mb: 1 }}
                            size='small'
                        />
                        <Field
                            as={ TextField }
                            name='provincia'
                            type='text'
                            fullWidth
                            label='Provincia'
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

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

    const { id } = params as { id: string };

    const { data } = await externalApiConToken.get(`/clientes/${ id }`, {
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
            cliente: data
        }
    }
}

export default ClientePage;