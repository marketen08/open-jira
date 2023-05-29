import { FC, useState, useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next'

import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

import { Button, Grid, IconButton,
        TextField, Typography,  
        Card, CardContent, CardActions, 
        Box } from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { IMensaje, Pedido } from "../../interfaces";
import { externalApiConToken } from '../../apiAxios';
import { useRouter } from 'next/router';
import { PedidoUploadFile } from '../../components/pedidos/PedidoUploadFile';
import { AdjuntoLista } from '../../components/adjuntos/AdjuntoLista';
import { EmailOutlined } from '@mui/icons-material';
import { AdjuntosContext } from '../../context/adjuntos/AdjuntosContext';
import { SocketContext } from '../../context/socket';

interface Props {
    pedido: Pedido,
    id: string
}

export const PedidoPage:FC<Props> = ({ pedido, id }) => {

    const router = useRouter();

    const { refreshAdjuntos } = useContext(AdjuntosContext)
    const { socket } = useContext( SocketContext );

    const handleActivarChat = async() => {
        router.push(`/chat/${ pedido.vehiculo.cliente._id }`);
    }
  
    const formularioInicial = { servicio: '', importe: 0 };
    
    const [modificar, setModificar] = useState(false);
    const [cotizar, setCotizar] = useState(false);

    const onSave = async( values: Pedido ) => {

        const { id, descripcion, listaItems } = values;
        
        if ( modificar ) {
            const modificar = await externalApiConToken.put(`/pedidos/${ id }`, { descripcion })
        }

        if ( cotizar ) {
            values.estado = 'Cotizando'
            const cotizando = await externalApiConToken.put(`/pedidos/cotizando/${ id }`, { listaItems })
        }

        setModificar(false);
        setCotizar(false);
    }

    const onVolverCotizar = async( values: Pedido ) => {
        
        const { id, listaItems } = values;
        
        values.estado = 'Cotizando'
        const cotizando = await externalApiConToken.put(`/pedidos/cotizando/${ id }`, { listaItems })

        setModificar(false);
        setCotizar(false);
    }

    const onVerCotizacion = async( values: Pedido ) => {
        
        const { urlPropuesta } = values;
        
        router.push(urlPropuesta);
    }

    const onCotizarEnviar = async( values: Pedido ) => {

        const { id, listaItems } = values;

        values.estado = 'Cotizado'

        await externalApiConToken.put(`/pedidos/cotizarenviar/${ id }`, { listaItems })
        
        const payload: IMensaje = {
            cliente: values.vehiculo.cliente.id,
            clase: 'enviado',
            estado: 'leido'
        }

        socket?.emit('frontend:enviar-cotizado', payload );

        setModificar(false);
        setCotizar(false);
    }

    useEffect(() => {
        // FALTA RESOLVER QUE EL REFRESH DE ADJUNTOS FUNCIONE CUANDO SE INGRESA DIRECTAMENTE AL LINK
        // EL PROBLEMA ESTA EN QUE NO TIENE CREDENCIALES PARA PODER EJECUTAR LA CONSULTA EN EL REFRECH DEL CONTEXT
        refreshAdjuntos( id );
    }, []);

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
                            

                            <Form autoComplete="off">
                                <Card sx={{ backgroundColor: 'whitesmoke'}}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" >
                                            Detalle del pedido #{ values.numero }
                                        </Typography>
                                        
                                        <Grid container spacing={2} >
                                            <Grid item xs={ 12 } sm={ 6 } md={ 6 }>
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
                                            
                                            <Grid item xs={ 12 } sm={ 6 } md={ 6 } sx={ values.estado === 'Cotizado' ? { display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' } : { display: 'none' } }>
                                                <Button
                                                    type='button'
                                                    variant='outlined'
                                                    color='success'
                                                    disabled={ isSubmitting || isValidating }
                                                    onClick={ () => onVerCotizacion( values ) }
                                                    sx={ values.urlPropuesta ? { marginRight: 1, height: 40 } : { display: 'none' }}
                                                >
                                                    <SaveOutlinedIcon />
                                                    <Typography>Ver cotización</Typography>
                                                </Button>
                                                <Button
                                                    type='button'
                                                    variant='outlined'
                                                    color='error'
                                                    disabled={ isSubmitting || isValidating }
                                                    onClick={ () => onVolverCotizar( values ) }
                                                    sx={{ height: 40 }}
                                                >
                                                    <SaveOutlinedIcon />
                                                    <Typography>Volver a cotizar</Typography>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <PedidoUploadFile id={ id } />
                                        <Grid container>
                                            <Grid item xs={12} md={6}>
                                                <AdjuntoLista id={ id } />
                                            </Grid>
                                        </Grid>
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
                                        <Box sx={ !cotizar && values.estado === 'Nuevo' ? { display: 'none' } : { display: 'block'}}>
                                            <FieldArray name="listaItems">
                                                {({ push, remove }) => (
                                                <>
                                                    { values.listaItems.map(( opcion, indiceFormulario) => (
                                                        <div key={ indiceFormulario }>
                                                            
                                                            <Box sx={{ display: 'flex' } }>
                                                                <Field
                                                                    as={ TextField }
                                                                    name={`listaItems.${indiceFormulario}.servicio`}
                                                                    type='text'
                                                                    fullWidth
                                                                    multiline
                                                                    disabled={ !cotizar }
                                                                    rows={ 1 }
                                                                    label='Detalle de la cotización'
                                                                    sx={{ mt: 1, mb: 1 }}

                                                                    error={ touched.descripcion && errors.descripcion }
                                                                    helperText={ touched.descripcion && errors.descripcion && 'Ingrese la descripción del vehículo' }
                                                                />
                                                                <Field
                                                                    as={ TextField }
                                                                    name={`listaItems.${indiceFormulario}.importe`}
                                                                    type='number'
                                                                    fullWidth
                                                                    disabled={ !cotizar }
                                                                    label='Importe'
                                                                    sx={{ m: 1, width: 150  }}
                                                                    error={ touched.descripcion && errors.descripcion }
                                                                    helperText={ touched.descripcion && errors.descripcion && 'Ingrese la descripción del vehículo' }
                                                                />
                                                                <Button
                                                                    disabled={isSubmitting}
                                                                    onClick={() => remove(indiceFormulario)}
                                                                    type='button'
                                                                    variant='outlined'
                                                                    color='error'
                                                                    sx={ !cotizar ? { display: 'none' } : { mt: 1, mb: 1 }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </Box>
                                                        </div>
                                                    ))}
                            
                                                    <div>
                                                        { typeof errors.listaItems === 'string' ? (
                                                            <>
                                                                { errors.listaItems }
                                                            </>
                                                        ) : null }
                                                    </div>
                                                    <Box sx={ !cotizar ? { display: 'none' } : { display: 'block' } } >
                                                        <Button
                                                            type='button'
                                                            variant='outlined'
                                                            color='success'
                                                            disabled={ isSubmitting || isValidating }
                                                            onClick={() => push(formularioInicial)}
                                                            >
                                                            Agregar nuevo item
                                                        </Button>
                                                    </Box>
                                                </>
                                                )}
                                            </FieldArray>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Box sx={ modificar || cotizar || values.estado === 'Cotizado' ? { display: 'none' } : { display: 'block' } }>
                                            <Button
                                                type='button'
                                                variant='outlined'
                                                color='primary'
                                                disabled={ isSubmitting || isValidating }
                                                onClick={ () => setModificar(true) }
                                                sx={{ margin: 1 }}
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
                                                sx={{ margin: 1 }}
                                                >
                                                <SaveOutlinedIcon />
                                                <Typography>Cotizar</Typography>
                                            </Button>
                                        </Box>
                                        <Box sx={ !modificar && !cotizar ? { display: 'none' } : { display: 'block' } } >
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
                                                onClick={ () => {
                                                    setModificar(false);
                                                    setCotizar(false);
                                                } }
                                                sx={{ margin: 1 }}
                                                >
                                                <SaveOutlinedIcon />
                                                <Typography>Cancelar</Typography>
                                            </Button>
                                        </Box>
                                        <Box sx={ !cotizar ? { display: 'none' } : { display: 'block' } } >
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
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Form>
                        </Grid>

                            <IconButton 
                                sx={{
                                    position:'fixed',
                                    bottom: 30,
                                    right: 30,
                                    border: 1,
                                    color: 'blue'
                                }}
                                onClick={ () => handleActivarChat() }
                            >
                                <EmailOutlined />
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
            pedido: data,
            id
        }
    }
}

export default PedidoPage;