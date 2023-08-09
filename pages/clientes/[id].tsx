import { FocusEvent, FC } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';

import { Formik, Form, Field, FormikProps, FormikErrors } from 'formik';
import { number, object, string } from 'yup';
import Swal from 'sweetalert2';
import { Button, Grid, IconButton, TextField, Typography, MenuItem, CardContent, Card, CardHeader, CardActions, CardMedia } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Cliente, ClienteCondicionIva, ClienteNuevo, ClientesResumen, ClienteTipoDeDocumento, Vehiculo, VehiculosResumen } from "../../interfaces";
import { externalApiConToken } from '../../apiAxios';
import { Layout } from "../../components/layouts";
import Link from 'next/link';


const validTipoDocumento: ClienteTipoDeDocumento[] = [ 'CUIT', 'CUIL', 'DNI', 'Otros' ]
const validCondicionIva: ClienteCondicionIva[] = [  'IVA Responsable Inscripto',
                                                    'Responsable Monotributo',
                                                    'IVA Sujeto Exento',
                                                    'Cliente del Exterior',
                                                    'Consumidor Final',
                                                    'IVA No Alcanzado' ];



const handleServerError = (error: any) => {
    if (error.response) {
      // El servidor ha respondido con un código de estado HTTP diferente de 2xx
      const array = [];
      for (let key in error.response.data.errors) {
        if (error.response.data.errors.hasOwnProperty(key)) {
          const value = error.response.data.errors[key];
          if (value.hasOwnProperty('msg')) {
            array.push(value.msg);
          }
        }
      }
      const errorMessage = `Por favor revisar los siguientes errores:<br>${array.join('<br>')}`;
  
      Swal.fire({
        title: 'Error en la solicitud',
        html: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
  
    } else {
      // Ocurrió un error durante la configuración de la solicitud
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error durante la solicitud',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
};

const validateExiste = async (buscar: string, etiqueta: string): Promise<string | undefined> => {
    try {
        const response = await externalApiConToken.get(`/clientes/existe/${buscar}`);
        // Si el email existe en la base de datos, el servidor podría responder con un código de estado específico (por ejemplo, 200) o algún otro indicador.
        // Puedes adaptar el código a tu servidor y verificar la respuesta de acuerdo a tus necesidades.
        if (response.data) {
            return `El ${ etiqueta } ya está registrado`;
        }
        return undefined; // El email no existe en la base de datos
    } catch (error) {
        console.error('Error al validar el email:', error);
        return `Ocurrió un error al validar el ${ etiqueta }`;
    }
};

  
const validateForm = async (values: Cliente | ClienteNuevo): Promise<FormikErrors<Cliente | ClienteNuevo>> => {
    
    const errors: FormikErrors<Cliente | ClienteNuevo> = {};
  
    if (values.celular && !('id' in values)) {
        const celularExistsError = await validateExiste(values.celular, 'celular');
        if (celularExistsError) {
            errors.celular = celularExistsError;
        }
    }

    return errors;
};

interface Props {
    cliente: Cliente | ClienteNuevo
    vehiculos: Vehiculo[]
}

export const ClientePage:FC<Props> = ({ cliente, vehiculos }) => {

    const router = useRouter();

    const onSave = async ( values: Cliente | ClienteNuevo) => {

        if (  !('id' in values) ){
            // NUEVO CLIENTE
            try {
                await externalApiConToken.post(`/clientes`, { ...values });
                router.push('/clientes')
            } catch (error: any) {
                handleServerError(error);
            }
        } else {
            // ACTUALIZAR CLIENTE
            try {
                await externalApiConToken.put(`/clientes/${values.id}`, { ...values });
                router.push('/clientes');
            } catch (error: any) {
                handleServerError(error);
            }
        }

    }

    const existeNumero = async(e: FocusEvent<HTMLInputElement>) => {
      
        const numero = e.target.value;
  
        try {
          const { data } = await externalApiConToken.get<ClientesResumen>(`/clientes?numero=${ numero }` ); 
          const { clientes } = data;
          
          if ( clientes.length > 0 && numero.length > 0 ) {
            Swal.fire({
              title: 'Existe un cliente registrado con ese número.',
              text: "¿Desea continuar?",
              icon: 'warning',
              showCancelButton: true,
              showDenyButton: true,
              denyButtonText: 'Ver clientes relacionados',
              denyButtonColor: '#3085d0',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              console.log(result);
              if ( result.isDenied ) {
                router.push(`/clientes?numero=${ numero }`);
              }
            })
          }
  
        } catch (error) {
          
        }
  
      }
  
    const existeCelular = async(e: FocusEvent<HTMLInputElement>) => {
        
        const celular = e.target.value;
  
        try {
          const { data } = await externalApiConToken.get<ClientesResumen>(`/clientes?celular=${ celular }` ); 
          const { clientes } = data;
          
          console.log(data)
          if ( clientes.length > 0 && celular.length > 0 ) {
            Swal.fire({
              title: 'Existe un cliente registrado con ese celular.',
              text: "¿Desea ir a la pantalla del cliente?",
              icon: 'warning',
              showCancelButton: true,
              showDenyButton: true,
              denyButtonText: 'Ver cliente relacionado',
              denyButtonColor: '#3085d0',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              console.log(result);
              if ( result.isDenied ) {
                router.push(`/clientes?celular=${ celular }`);
              }
            })
          }
  
        } catch (error) {
          
        }
  
    }

    return (
    
    <Layout title={ 'Detalle del cliente' }>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
                <Card sx={{ }} >
                    <Typography variant='h5' sx={{ fontWeight: 'bold', padding: 2 }}>DETALLE DEL CLIENTE</Typography>
                    <CardContent>
                        <Formik
                            initialValues={{ 
                                ...cliente
                            }}
                            onSubmit={ ( values ) => {
                                onSave( values );
                            }}
                            validate={validateForm}
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
                                email: string().email('El mail no es valido'),
                            })
                        }
                        >
                        {( { values, errors, touched, isSubmitting, isValidating, setErrors }:FormikProps<Cliente|ClienteNuevo> ) => {
                            
                            return (
                            <Form autoComplete="off">
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
                                    error={ Boolean(touched.numero && errors.numero) }
                                    helperText={ touched.numero && errors.numero && errors.numero }
                                    onBlur={ existeNumero }
                                />
                                <Field
                                    as={ TextField }
                                    name='nombre'
                                    type='text'
                                    fullWidth
                                    label='Nombre'
                                    sx={{ mt: 1.5, mb: 1 }}
                                    error={ Boolean(touched.nombre && errors.nombre) }
                                    helperText={ touched.nombre && errors.nombre && errors.nombre  }
                                />
                                <Field
                                    as={ TextField }
                                    name='celular'
                                    type='text'
                                    fullWidth
                                    label='Celular'
                                    sx={{ mt: 1.5, mb: 1 }}
                                    error={ Boolean(touched.celular && errors.celular) }
                                    helperText={ touched.celular && errors.celular && errors.celular  }
                                    onBlur={ existeCelular }
                                />
                                <Field
                                    as={ TextField }
                                    name='email'
                                    type='text'
                                    fullWidth
                                    label='Email'
                                    sx={{ mt: 1.5, mb: 1 }}
                                    error={ Boolean(touched.email && errors.email) }
                                    helperText={ touched.email && errors.email && errors.email }
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
                                    disabled={ isSubmitting }
                                >
                                    <SaveOutlinedIcon />
                                    <Typography>Guardar</Typography>
                                    
                                </Button>
                            </Form>
                        )}}
                        </Formik>
                    </CardContent>
                </Card>
            </Grid>
            { 'id' in cliente && 
                <Grid item xs={12} md={6} lg={6}>
                    <Card sx={{ }} >
                        <Typography variant='h5' sx={{ fontWeight: 'bold', padding: 2 }}>VEHICULOS ASIGNADOS</Typography>
                        {
                            'id' in cliente &&
                                <Link href={ `/vehiculos/nuevo?cliente=${ cliente.id }` }   >
                                    <Button variant='text' sx={{ marginLeft: 2}} >
                                        Agregar nuevo vehiculo
                                    </Button>
                                </Link>
                        }
                        <CardContent>
                            <Grid container spacing={2}>
                                { vehiculos.map( (vehiculo, index ) => (
                                    <Grid item xs={12} sm={6} md={6} lg={6} key={ index }>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                { vehiculo.patente } 
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                { vehiculo.marca } { vehiculo.modelo }
                                            </Typography>
                                        </CardContent>
                                        {
                                            false && 
                                            <CardMedia
                                                sx={{ height: 80 }}
                                                image="/static/images/cards/contemplative-reptile.jpg"
                                                title="green iguana"
                                            />
                                        }
                                        
                                        <CardActions>
                                            <Link href={ `/pedidos/nuevo/${ vehiculo.id }` }   >
                                                <Button variant='text' sx={{ marginLeft: 2}} size="small">
                                                    Crear un pedido
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                )) }
                                
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
            }
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
        const cliente : ClienteNuevo = {
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
            telefono: ''
        }

        return {
            props: {
                cliente
            }
        }
    }

    try {
        const { data:cliente } = await externalApiConToken.get<Cliente>(`/clientes/${ id }`, {
            headers: {
                'x-token': req.cookies.token
            }
        });

        const { data:vehiculosResumen } = await externalApiConToken.get<VehiculosResumen>(`/vehiculos?clienteId=${ cliente.id }`, {
            headers: {
                'x-token': req.cookies.token
            }
        });

        return {
            props: {
                cliente,
                vehiculos: vehiculosResumen.vehiculos
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