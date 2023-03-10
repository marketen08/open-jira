import { Box, Button, Card, CardContent, CircularProgress, Grid, MenuItem, Step, StepLabel, Stepper } from '@mui/material';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { TextField } from 'formik-mui';
import React, { FocusEvent, ReactNode, useState } from 'react';
import { number, object, string } from 'yup';
import { NextPage } from 'next';
import { Layout } from '../../components/layouts';
import { externalApiConToken } from '../../apiAxios/externalApi';
import { ClienteCondicionIva, ClienteTipoDeDocumento, Vehiculo } from '../../interfaces';
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router';

const validTipoDocumento: ClienteTipoDeDocumento[] = [ 'CUIT', 'CUIL', 'DNI', 'Otros' ]
const validCondicionIva: ClienteCondicionIva[] = [  'IVA Responsable Inscripto',
                                                    'Responsable Monotributo',
                                                    'IVA Sujeto Exento',
                                                    'Cliente del Exterior',
                                                    'Consumidor Final',
                                                    'IVA No Alcanzado' ];

const sleep = (time:any) => new Promise((acc) => setTimeout(acc, time));

const Ingreso:NextPage = () => {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async( values: any ) => {
        console.log('values', values);
        try {
            await externalApiConToken.post<Vehiculo>('/pedidos/ingreso', values );    
            enqueueSnackbar('Ingreso de servicio actualizado', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }

            })
            
            // console.log(vehiculo);
            router.push('/pedidos');

        } catch (error) {
            
        }
    }

    const existeDocumento = async(e: FocusEvent<HTMLInputElement>) => {
      
      const documento = e.target.value;

      try {
        const existeDocumento = await externalApiConToken.get<Vehiculo>(`/clientes?documento=${ documento }` ); 
      
        if ( existeDocumento ) {
        
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
                      
                        initialValues={{
                            numero: '',
                            tipoDeDocumento: 'DNI',
                            nombre: '',
                            email: '',
                            celular: '',
                            domicilio: '',
                            provincia: '',
                            localidad: '',
                            condicionIva: 'Consumidor Final',
                            patente: '',
                            marca: '',
                            modelo: '',
                            description: '',
                        }}
                        onSubmit={async (values) => {
                            // await sleep(3000);
                            
                            handleSubmit( values );
                        }}
                    >
                      <FormikStep label="Datos del cliente"
                        validationSchema={object({
                          numero: string().required('El n??mero de documento es obligatorio'), 
                          tipoDeDocumento: string().required('El n??mero de documento es obligatorio'),
                          nombre: string().required('El nombre y apellido es obligatorio'),
                          celular: number()
                                  .typeError("Por favor ingresar solo n??meros")
                                  .positive("Por favor ingresar solo n??meros no guiones")
                                  .integer("Por favor ingresar solo n??meros sin punto")
                                  .min(1000000000, 'El celular debe tener 10 caracteres')
                                  .max(9999999999, 'El celular debe tener 10 caracteres')
                                  .required('El celular es obligatorio'),
                          email: string().email('El mail no es valido').required('El email es obligatorio'),
                        })}
                      >
                        <Box paddingBottom={2}>
                            <Field fullWidth name="numero" component={TextField} label="N??mero de documento" 
                              onBlur={ (e:FocusEvent<HTMLInputElement>) => {
                                const documento = e.target.value;
                                console.log(documento);
                            } } />
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
                            <Field fullWidth name="email" component={TextField} label="Email" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="celular" component={TextField} label="Celular" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="domicilio" component={TextField} label="Domicilio" inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="provincia" component={TextField} label="Provincia" inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="localidad" component={TextField} label="Localidad" inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Box>
                        <Box paddingBottom={2}>
                          <Field fullWidth name="condicionIva" component={TextField} label="Condici??n de Iva" select>
                            {
                              validCondicionIva.map( cond => <MenuItem value={ cond } key={ cond }>{ cond }</MenuItem> )
                            }
                          </Field>
                        </Box>
                      </FormikStep>
                      <FormikStep label="Datos del veh??culo"
                        validationSchema={object({
                        patente: string().min(6, 'La patente debe tener como m??nimo 6 caracteres')
                                        .required('La patente es obligatoria'),
                        marca: string().required('La marca es obligatoria'),
                        modelo: string().required('El modelo es obligatorio'),
                        nombre: string().required('El nombre y apellido es obligatorio'),
                        celular: number()
                                .typeError("Por favor ingresar solo n??meros")
                                .positive("Por favor ingresar solo n??meros no guiones")
                                .integer("Por favor ingresar solo n??meros sin punto")
                                .min(1000000000, 'El celular debe tener 10 caracteres')
                                .max(9999999999, 'El celular debe tener 10 caracteres')
                                .required('El celular es obligatorio'),
                        email: string().email('El mail no es valido').required('El email es obligatorio'),
                        })}
                      >
                        <Box paddingBottom={2}>
                            <Field fullWidth name="patente" component={TextField} label="Patente" inputProps={{ style: { textTransform: "uppercase" } }} />
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
                            descripcion: string().required('La descripci??n del servicio es obligatoria')
                        })}
                      >
                        <Box paddingBottom={2}>
                            <Field fullWidth name="descripcion" component={TextField} label="Descripci??n del servicio" multiline rows={6} />
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