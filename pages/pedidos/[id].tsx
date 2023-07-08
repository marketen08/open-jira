import { FC, useState, useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { Formik, Form, Field, FieldArray } from 'formik';

import { Button, Grid, IconButton,
        TextField, Typography,  
        Card, CardContent, CardActions, 
        Box, 
        MenuItem} from "@mui/material";

import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { ClienteCondicionIva, IMensaje, Pedido } from "../../interfaces";
import { externalApiConToken } from '../../apiAxios';
import { PedidoUploadFile } from '../../components/pedidos/PedidoUploadFile';
import { AdjuntoLista } from '../../components/adjuntos/AdjuntoLista';
import { EmailOutlined, Phone } from '@mui/icons-material';
import { AdjuntosContext } from '../../context/adjuntos/AdjuntosContext';
import { SocketContext } from '../../context/socket';
import { ChatContext } from '../../context';
import { FormControl, InputLabel, Select } from '@mui/material';
import { PedidoEstados } from '../../interfaces/pedido';

interface Props {
    pedido: Pedido,
    id: string
}

const validCondicionIva: ClienteCondicionIva[] = [  'IVA Responsable Inscripto',
                                                    'Responsable Monotributo',
                                                    'IVA Sujeto Exento',
                                                    'Cliente del Exterior',
                                                    'Consumidor Final',
                                                    'IVA No Alcanzado' ];

export const PedidoPage:FC<Props> = ({ pedido, id }) => {

    const router = useRouter();

    const { activarChat } = useContext(ChatContext);
    const { refreshAdjuntos } = useContext(AdjuntosContext)
    const { socket } = useContext( SocketContext );

    const handleActivarChat = async() => {
        const idCliente = pedido.vehiculo.cliente._id;
        activarChat( idCliente )
        router.push(`/chat/${ idCliente }`);
    }
  
    const handleLlamarTelefono = async() => {
        const celular = pedido.vehiculo.cliente.celular;
        console.log(celular)
        router.push(`tel:${ celular }`);
    }

    const formularioInicial = { servicio: '', importe: 0, cantidad: 0 };
    
    const [modificar, setModificar] = useState(false);

    const estados = [ 'Nuevo', 'Cotizando', 'Cotizado', 'Aprobado', 'Rechazado', 'Finalizado' ];


    const onSave = async( values: Pedido ) => {

        const { id } = values;
        
        if ( values.estado === 'Nuevo' ) {
            values.estado = 'Cotizando'
        }

        try {
            const resultado = await externalApiConToken.put(`/pedidos/${ id }`, { ...values })
            
        } catch (error) {
            console.log(error);
        }

        setModificar(false);
    }

    const onEstadoChange = async( values: Pedido, setFieldValue: any, estado: PedidoEstados ) => {
        
        const { id } = values;

        setFieldValue('estado', estado);
        values.estado = estado;

        try {
            const resultado = await externalApiConToken.put(`/pedidos/${ id }`, { ...values });
            setModificar(false);

        } catch (error) {
            console.log(error);
        }

        
    }

    const onVerCotizacion = async( values: Pedido ) => {
        
        const { urlPropuesta } = values;
        
        router.push(urlPropuesta);
    }

    const onCotizarEnviar = async( values: Pedido ) => {

        const { id } = values;

        values.estado = 'Cotizado'

        try {
            const resultado = await externalApiConToken.put(`/pedidos/${ id }`, { ...values });
            
            const payload: IMensaje = {
                cliente: values.vehiculo.cliente._id,
                clase: 'enviado',
                estado: 'leido',
                tipo: 'documento',
                link: resultado.data.urlPropuesta,
                pedido: id,
                urlPropuesta: resultado.data.urlPropuesta
            }
    
            socket?.emit('frontend:enviar-cotizado', payload );
    
            setModificar(false);

        } catch (error) {
            console.log(error);
        }
        
        
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

                {( { values, errors, touched, isSubmitting, isValidating, setSubmitting, setFieldValue } ) => (
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
                                            
                                            <Grid item xs={ 12 } sm={ 6 } md={ 6 } >
                                                <Field 
                                                    as={ TextField }
                                                    name='condicionIva'
                                                    fullWidth
                                                    disabled={ !modificar }
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
                                                    name='estado'
                                                    fullWidth
                                                    // disabled={ values.estado === 'Cotizado' ? false : true }
                                                    size='small'
                                                    label='Estado'
                                                    sx={{ mt: 1.5, mb: 1 }}
                                                    select
                                                    onChange={ (e:any) => {
                                                        onEstadoChange( values, setFieldValue, e.target.value );
                                                    } }
                                                >
                                                    {
                                                        estados.map( item => 
                                                        <MenuItem value={ item } key={ item }>{ item }</MenuItem>
                                                        )
                                                    }
                                                </Field>
                                                <Box sx={ values.urlPropuesta ? { display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' } : { display: 'none' } }>
                                                    <Button
                                                        type='button'
                                                        variant='outlined'
                                                        color='success'
                                                        disabled={ isSubmitting || isValidating }
                                                        onClick={ () => onVerCotizacion( values ) }
                                                        sx={ { marginRight: 1 } }
                                                    >
                                                        <Typography>Ver cotización</Typography>
                                                    </Button>
                                                </Box>
                                                
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
                                        <Box sx={ !modificar && values.estado === 'Nuevo' ? { display: 'none' } : { display: 'block'}}>
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
                                                                    disabled={ !modificar }
                                                                    rows={ 1 }
                                                                    label='Detalle de la cotización'
                                                                    sx={{ mt: 1, mb: 1 }}
                                                                />
                                                                <Field
                                                                    as={ TextField }
                                                                    name={`listaItems.${indiceFormulario}.importe`}
                                                                    type='number'
                                                                    fullWidth
                                                                    disabled={ !modificar }
                                                                    label='Importe'
                                                                    sx={{ m: 1, width: 150  }}
                                                                />
                                                                <Field
                                                                    as={ TextField }
                                                                    name={`listaItems.${indiceFormulario}.cantidad`}
                                                                    type='number'
                                                                    fullWidth
                                                                    disabled={ !modificar }
                                                                    label='Cantidad'
                                                                    sx={{ m: 1, width: 150  }}
                                                                />
                                                                <Field
                                                                    as={ TextField }
                                                                    value={ opcion.importe * opcion.cantidad }
                                                                    type='number'
                                                                    fullWidth
                                                                    disabled={ !false }
                                                                    label='Importe'
                                                                    sx={{ m: 1, width: 150  }}
                                                                />
                                                                <Button
                                                                    disabled={isSubmitting}
                                                                    onClick={() => remove(indiceFormulario)}
                                                                    type='button'
                                                                    variant='outlined'
                                                                    color='error'
                                                                    sx={ !modificar ? { display: 'none' } : { mt: 1, mb: 1 }}
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
                                                    <Box sx={ !modificar ? { display: 'none' } : { display: 'block' } } >
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
                                        <Grid container>
                                            <Grid item md={6}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Typography variant='h6' padding={ 2 }>Neto</Typography>
                                                    <Typography variant='h6' padding={ 2 }>
                                                        { values.listaItems.reduce((inicial, valor) => 
                                                            inicial + (valor.importe * valor.cantidad), 0)
                                                            .toLocaleString('es-AR', {  
                                                                style: 'currency',
                                                                currency: 'ARS'
                                                            }) 
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item md={3}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Typography variant='h6' padding={ 2 }>IVA</Typography>
                                                    <Typography variant='h6' padding={ 2 }>
                                                        { values.condicionIva !== 'IVA Sujeto Exento' ?  
                                                            values.listaItems.reduce((inicial, valor) => 
                                                            inicial + valor.importe * valor.cantidad * 0.21, 0)
                                                            .toLocaleString('es-AR', {  
                                                                style: 'currency',
                                                                currency: 'ARS'
                                                            }) 
                                                            : parseFloat('0').toLocaleString('es-AR', {  
                                                                style: 'currency',
                                                                currency: 'ARS'
                                                            }) 
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item md={3}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Typography variant='h6' padding={ 2 }>Total</Typography>
                                                    <Typography variant='h6' padding={ 2 }>
                                                        { values.condicionIva !== 'IVA Sujeto Exento' ? 
                                                            values.listaItems.reduce((inicial, valor) => 
                                                            inicial + valor.importe * valor.cantidad * 1.21, 0)
                                                            .toLocaleString('es-AR', {  
                                                                style: 'currency',
                                                                currency: 'ARS'
                                                            }) 
                                                            :
                                                            values.listaItems.reduce((inicial, valor) => 
                                                            inicial + valor.importe * valor.cantidad, 0)
                                                            .toLocaleString('es-AR', {  
                                                                style: 'currency',
                                                                currency: 'ARS'
                                                            }) 
                                                        }
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Box sx={ modificar ? { display: 'none' } : { display: 'block' } }>
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
                                        </Box>
                                        <Box sx={ !modificar ? { display: 'none' } : { display: 'block' } } >
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
                                                } }
                                                sx={{ margin: 1 }}
                                                >
                                                <SaveOutlinedIcon />
                                                <Typography>Cancelar</Typography>
                                            </Button>
                                        </Box>
                                        <Box sx={ !modificar ? { display: 'none' } : { display: 'block' } } >
                                            <Button
                                                type='button'
                                                variant='outlined'
                                                color='primary'
                                                disabled={ isSubmitting || isValidating }
                                                onClick={ () => onCotizarEnviar( values ) }
                                            >
                                                <SaveOutlinedIcon />
                                                <Typography>Guardar y Enviar</Typography>
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
                            <IconButton 
                                sx={{
                                    position:'fixed',
                                    bottom: 30,
                                    right: 80,
                                    border: 1,
                                    color: 'blue'
                                }}
                                onClick={ () => handleLlamarTelefono() }
                            >
                                <Phone />
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