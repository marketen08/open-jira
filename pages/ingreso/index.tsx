import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { TextField } from 'formik-mui';
import React, { ReactNode, useState } from 'react';
import { number, object, string } from 'yup';
import { NextPage } from 'next';
import { Layout } from '../../components/layouts';
import { externalApiConToken } from '../../apiAxios/externalApi';
import { Vehiculo } from '../../interfaces';
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router';

const sleep = (time:any) => new Promise((acc) => setTimeout(acc, time));

const Ingreso:NextPage = () => {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async( values: any ) => {
        // console.log('values', values);
        try {
            await externalApiConToken.post<Vehiculo>('/vehiculos/pedido', values );    
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

    return (
        <Layout title='Pedidos'>
      
        <Grid>
            <Card>
                <CardContent>
                    <FormikStepper
                        initialValues={{
                            patente: '',
                            marca: '',
                            modelo: '',
                            nombre: '',
                            celular: '',
                            email: '',
                            description: '',
                        }}
                        onSubmit={async (values) => {
                            // await sleep(3000);
                            
                            handleSubmit( values );
                        }}
                    >
                    <FormikStep label="Datos del vehículo"
                        validationSchema={object({
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
                        email: string().email('El mail no es valido').required('El email es obligatorio'),
                        })}
                    >
                        <Box paddingBottom={2}>
                            <Field fullWidth name="patente" component={TextField} label="Patente" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="marca" component={TextField} label="Marca" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="modelo" component={TextField} label="Modelo" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="nombre" component={TextField} label="Nombre y Apellido" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="celular" component={TextField} label="Celular" />
                        </Box>
                        <Box paddingBottom={2}>
                            <Field fullWidth name="email" component={TextField} label="Email" />
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

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
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