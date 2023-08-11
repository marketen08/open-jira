import { Box, Button, Card, CardContent, CircularProgress, Grid, MenuItem, Step, StepLabel, Stepper } from '@mui/material';
import { Field, Form, Formik, FormikConfig, FormikErrors, FormikValues } from 'formik';
import { TextField } from 'formik-mui';
import React, { FocusEvent, ReactNode, useState } from 'react';
import { number, object, string } from 'yup';
import { NextPage } from 'next';
import { Layout } from '../../components/layouts';
import { externalApiConToken } from '../../apiAxios/externalApi';
import { Cliente, ClienteCondicionIva, ClienteTipoDeDocumento, Ingreso, Vehiculo, VehiculosResumen } from '../../interfaces';
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router';
import { ClientesResumen, ClienteNuevo } from '../../interfaces/cliente';
import Swal from 'sweetalert2';

const validTipoDocumento: ClienteTipoDeDocumento[] = [ 'CUIT', 'CUIL', 'DNI', 'Otros' ]
const validCondicionIva: ClienteCondicionIva[] = [  'IVA Responsable Inscripto',
                                                    'Responsable Monotributo',
                                                    'IVA Sujeto Exento',
                                                    'Cliente del Exterior',
                                                    'Consumidor Final',
                                                    'IVA No Alcanzado' ];



const validateExiste = async (buscar: string, etiqueta: string): Promise<string | undefined> => {
  try {
      const response = await externalApiConToken.get(`/clientes/existe/${buscar}`);
      // Si el email existe en la base de datos, el servidor podría responder con un código de estado específico (por ejemplo, 200) o algún otro indicador.
      // Puedes adaptar el código a tu servidor y verificar la respuesta de acuerdo a tus necesidades.
      if (response.data) {
          console.log('existe data');
          return `El ${ etiqueta } ya está registrado`;
      }
      return undefined; // El email no existe en la base de datos
  } catch (error) {
      console.error('Error al validar el email:', error);
      return `Ocurrió un error al validar el ${ etiqueta }`;
  }
};

const validateExistePatente = async ( patente: string ): Promise<string | undefined> => {
  try {
      const response = await externalApiConToken.get(`/vehiculos?patente=${ patente }`);
      
      const { total } = response.data;

      // Si el email existe en la base de datos, el servidor podría responder con un código de estado específico (por ejemplo, 200) o algún otro indicador.
      // Puedes adaptar el código a tu servidor y verificar la respuesta de acuerdo a tus necesidades.
      if ( total > 0 ) {
          console.log('existe data');
          return `La patente ya está registrada`;
      }
      return undefined; // La patente no existe en la base de datos
  } catch (error) {
      console.error('Error al validar el email:', error);
      return `Ocurrió un error al validar la patente`;
  }
};

const validateForm = async (values: any ): Promise<FormikErrors<Ingreso>> => {
  
  const errors: FormikErrors<Ingreso> = {};

  if (values.celular && !('id' in values)) {
      const celularExistsError = await validateExiste(values.celular, 'celular');
      if (celularExistsError) {
          errors.celular = celularExistsError;
      }
  }

  if (values.patente && !('id' in values)) {
    const patenteExistsError = await validateExistePatente( values.patente );
    if ( patenteExistsError ) {
        errors.patente = patenteExistsError;
    }
}

  return errors;
};

const valoresIniciales: Ingreso = {
  numero: '',
  tipoDeDocumento: 'DNI',
  nombre: '',
  email: '',
  celular: '',
  telefono: '',
  domicilio: '',
  provincia: '',
  localidad: '',
  condicionIva: 'Consumidor Final',
  patente: '',
  marca: '',
  modelo: '',
  descripcion: '',
}

const Ingreso:NextPage = () => {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async( values: any ) => {
        try {
            await externalApiConToken.post<Ingreso>('/pedidos/ingreso', values );    
            enqueueSnackbar('Ingreso de servicio actualizado', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }

            })
            router.push('/pedidos');

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

    const existeNumero = async(e: FocusEvent<HTMLInputElement>) => {
      
      const numero = e.target.value;

      try {
        const { data } = await externalApiConToken.get<ClientesResumen>(`/clientes?numero=${ numero }` ); 
        const { clientes } = data;
        
        console.log(data)
        if ( clientes.length > 0 && numero.length > 0 ) {
          Swal.fire({
            title: 'Existe un cliente registrado con ese número.',
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
              router.push(`/clientes?numero=${ numero }`);
            }
          })
        }

      } catch (error) {
        
      }

    }

    const existePatente = async(e: FocusEvent<HTMLInputElement>) => {
      
      const patente = e.target.value.toUpperCase();

      try {
        const { data } = await externalApiConToken.get<VehiculosResumen>(`/vehiculos?patente=${ patente }` ); 
        const { vehiculos } = data;
        
        if ( vehiculos.length > 0 && patente.length > 0 ) {
          Swal.fire({
            title: 'Existe un vehiculo registrado con esa patente.',
            text: "¿Desea ir a la pantalla del vehiculo?",
            icon: 'warning',
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: 'Ver vehiculo relacionado',
            denyButtonColor: '#3085d0',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            console.log(result);
            if ( result.isDenied ) {
              router.push(`/vehiculos?patente=${ patente }`);
            }
          })
        }

      } catch (error) {
        
      }

    }

    return (
        <Layout title='Pedidos'>
      
        <Grid>
            <Card>
                <CardContent>
                    <FormikStepper
                        validate={ validateForm }
                        initialValues={ valoresIniciales }
                        onSubmit={async (values) => {
                          console.log(values);
                            handleSubmit( values );
                        }}
                    >
                      <FormikStep label="Datos del cliente"
                        validationSchema={ object({
                          numero: string().required('El número de documento es obligatorio'), 
                          tipoDeDocumento: string().required('El número de documento es obligatorio'),
                          nombre: string().required('El nombre y apellido es obligatorio'),
                          celular: number()
                                  .typeError("Por favor ingresar solo números")
                                  .positive("Por favor ingresar solo números no guiones")
                                  .integer("Por favor ingresar solo números sin punto")
                                  .min(1000000000, 'El celular debe tener 10 caracteres')
                                  .max(9999999999, 'El celular debe tener 10 caracteres')
                                  .required('El celular es obligatorio'),
                          email: string().email('El mail no es valido'),
                        })}
                      >
                        <Box paddingBottom={2}>
                            <Field fullWidth name="numero" component={TextField} label="Número de documento" onBlur={ existeNumero } />
                        </Box>
                        <Box paddingBottom={2}>
                          <Field fullWidth name="tipoDeDocumento" component={TextField} label="Tipo de Documento" select>
                            {
                                validTipoDocumento.map( cond => <MenuItem value={ cond } key={ cond }>{ cond }</MenuItem> )
                            }
                          </Field>
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="nombre" component={TextField} label="Nombre y Apellido / Razon Social" inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="celular" component={TextField} label="Celular" onBlur={ existeCelular } />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="email" component={TextField} label="Email" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="telefono" component={TextField} label="Teléfono" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="domicilio" component={TextField} label="Domicilio" inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="localidad" component={TextField} label="Localidad" inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="provincia" component={TextField} label="Provincia" inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Box>
                        <Box paddingBottom={2}>
                          <Field fullWidth name="condicionIva" component={TextField} label="Condición de Iva" select>
                            {
                              validCondicionIva.map( cond => <MenuItem value={ cond } key={ cond }>{ cond }</MenuItem> )
                            }
                          </Field>
                        </Box>
                      </FormikStep>
                      <FormikStep label="Datos del vehículo"
                        validationSchema={ object({
                        patente: string().min(6, 'La patente debe tener como mínimo 6 caracteres')
                                        .required('La patente es obligatoria'),
                        marca: string().required('La marca es obligatoria'),
                        modelo: string().required('El modelo es obligatorio'),
                        nombre: string().required('El nombre y apellido es obligatorio'),
                        celular: number()
                                .typeError("Por favor ingresar solo números")
                                .positive("Por favor ingresar solo números no guiones")
                                .integer("Por favor ingresar solo números sin punto")
                                .min(1000000000, 'El celular debe tener 10 caracteres')
                                .max(9999999999, 'El celular debe tener 10 caracteres')
                                .required('El celular es obligatorio'),
                        email: string().email('El mail no es valido'),
                        })}
                      >
                        <Box paddingBottom={2}>
                            <Field fullWidth name="patente" component={TextField} label="Patente" inputProps={{ style: { textTransform: "uppercase" } }} onBlur={ existePatente } />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="marca" component={TextField} label="Marca" inputProps={{ style: { textTransform: "uppercase" } }}/>
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="modelo" component={TextField} label="Modelo" inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Box>
                      </FormikStep>
                      <FormikStep 
                        label="Datos del servicio"
                        validationSchema={object({
                            descripcion: string().required('La descripción del servicio es obligatoria')
                        })}
                      >
                        <Box paddingBottom={2}>
                            <Field fullWidth name="descripcion" component={TextField} label="Descripción del servicio" multiline rows={6} />
                        </Box>
                      </FormikStep>
                    </FormikStepper>
                </CardContent>
            </Card>
        </Grid>
      
      </Layout>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}


export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper( propiedades: FormikConfig<FormikValues>) {

  const { ...props } = propiedades

  const children: any = propiedades.children;
  
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);

          // the next line was not covered in the youtube video
          //
          // If you have multiple fields on the same step
          // we will see they show the validation error all at the same time after the first step!
          //
          // If you want to keep that behaviour, then, comment the next line :)
          // If you want the second/third/fourth/etc steps with the same behaviour
          //    as the first step regarding validation errors, then the next line is for you! =)
          //
          // In the example of the video, it doesn't make any difference, because we only
          //    have one field with validation in the second step :)
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Anterior
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Guardando' : isLastStep() ? 'Guardar' : 'Siguiente'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default Ingreso;