import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'

import { ErrorMessage, Formik, Form, Field } from 'formik';
import { number, object, string } from 'yup';

import { Autocomplete, Button, Grid, IconButton, TextField, Typography, MenuItem, FormGroup, CardContent, Card, CardHeader } from '@mui/material';
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Cliente, ClienteCondicionIva, ClienteTipoDeDocumento } from "../../interfaces";
import { ClientesContext } from '../../context/clientes';
import { dateFunctions } from '../../utils';
import { externalApiConToken } from '../../apiAxios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

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

    const router = useRouter();

    // const { updateCliente } = useContext(ClientesContext);
    // const { codigo, tipoDeDocumento, numero, razonSocial, nombre, condicionIva, domicilio, provincia, localidad, telefono, email } = cliente;

    const onSave = async ( values: Cliente ) => {

        if ( values.codigo === 0 ){
            // NUEVO CLIENTE
            await externalApiConToken.post(`/clientes`, { ...values });
            router.push('/clientes')
        } else {
            // ACTUALIZAR CLIENTE
            await externalApiConToken.put(`/clientes/${ values.id }`, { ...values });
            router.push('/clientes')
        }

    }

  return (
    
    <Layout title={ 'Detalle del cliente' }>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: 2, padding: 2 }}
        >
            <Card>
                <CardHeader title="Detalle del Cliente" sx={{ backgroundColor: 'gray', color: 'white'}} />
                <CardContent>
                    <Formik
                        initialValues={{ 
                            ...cliente
                        }}
                        onSubmit={ ( values ) => {
                            onSave( values );
                        }}
                        validationSchema={ object({
                            tipoDeDocumento: string().required('El tipo de documento es obligatorio'),
                            numero: string().required('El número de documento es obligatorio'), 
                            nombre: string().required('El nombre y apellido es obligatorio'),
                            celular: number()
                                    .typeError("Por favor ingresar solo números")
                                    .positive("Por favor ingresar solo números no guiones")
                                    .integer("Por favor ingresar solo números sin punto")
                                    .min(1000000000, 'El celular debe tener 10 caracteres')
                                    .max(9999999999, 'El celular debe tener 10 caracteres')
                                    .required('El celular es obligatorio'),
                            email: string().email('El mail no es valido').required('El email es obligatorio'),
                        })
                    }>
                    {( { values, errors, touched, isSubmitting, isValidating }:any ) => (
                        <Form autoComplete="off">
                            {
                                values.codigo !== 0 &&
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
                            }
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
                            <Field
                                as={ TextField }
                                name='numero'
                                type='text'
                                fullWidth
                                label='Número'
                                sx={{ mt: 1.5, mb: 1 }}
                                error={ touched.numero && errors.numero }
                                helperText={ touched.numero && errors.numero && errors.numero }
                            />
                            
                            <Field
                                as={ TextField }
                                name='nombre'
                                type='text'
                                fullWidth
                                label='Nombre'
                                sx={{ mt: 1.5, mb: 1 }}
                                error={ touched.nombre && errors.nombre }
                                helperText={ touched.nombre && errors.nombre && errors.nombre  }
                            />
                            <Field
                                as={ TextField }
                                name='email'
                                type='text'
                                fullWidth
                                label='Email'
                                sx={{ mt: 1.5, mb: 1 }}
                                error={ touched.email && errors.email }
                                helperText={ touched.email && errors.email && errors.email }
                            />
                            <Field
                                as={ TextField }
                                name='celular'
                                type='text'
                                fullWidth
                                label='Celular'
                                sx={{ mt: 1.5, mb: 1 }}
                                error={ touched.celular && errors.celular }
                                helperText={ touched.celular && errors.celular && errors.celular  }
                            />
                            <Field
                                as={ TextField }
                                name='telefono'
                                type='text'
                                fullWidth
                                label='Teléfono'
                                sx={{ mt: 1.5, mb: 1 }}
                            />
                            <Field
                                as={ TextField }
                                name='razonSocial'
                                type='text'
                                fullWidth
                                label='Razon Social'
                                sx={{ mt: 1.5, mb: 1 }}
                            />
                            
                            <Field
                                as={ TextField }
                                name='domicilio'
                                type='text'
                                fullWidth
                                label='Domicilio'
                                sx={{ mt: 1.5, mb: 1 }}
                            />
                            <Field
                                as={ TextField }
                                name='localidad'
                                type='text'
                                fullWidth
                                label='Localidad'
                                sx={{ mt: 1.5, mb: 1 }}
                            />
                            <Field
                                as={ TextField }
                                name='provincia'
                                type='text'
                                fullWidth
                                label='Provincia'
                                sx={{ mt: 1.5, mb: 1 }}
                            />
                           
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

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

    const { id } = params as { id: string };


    if ( id === 'nuevo' ) {
        const cliente : Cliente = {
            id: '',
            codigo: 0,
            numero: '',
            tipoDeDocumento: 'DNI',
            nombre: '',
            email: '',
            celular: '',
            razonSocial: '',
            condicionIva: 'Consumidor Final',
            domicilio: '',
            provincia: '',
            localidad: '',
            telefono: '',
            activo: false,
            createdAt: 0
        }

        return {
            props: {
                cliente
            }
        }
    }

    try {
        const { data } = await externalApiConToken.get(`/clientes/${ id }`, {
            headers: {
                'x-token': req.cookies.token
            }
        });

        return {
            props: {
                cliente: data
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

export default ClientePage;