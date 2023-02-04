import { useState, useEffect, useContext } from 'react';
import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { signIn, getSession, getProviders } from 'next-auth/react';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';


type FormData = {
    email   : string,
    password: string,
};


const LoginPage = () => {

    const { loginUser } = useContext(AuthContext);

    const router = useRouter();
    // const { loginUser } = useContext( AuthContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    
    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
      getProviders().then( prov => {
        // console.log({prov});
        setProviders(prov)
      })
    }, [])
    
    const onLoginUser = async( { email, password }: FormData ) => {

        setShowError(false);

        const aa = await signIn('credentials', { email, password });
        
        // login manual, tambien guarda la cookie token
        // const isValidLogin = await loginUser( email, password );
        // console.log(aa);
        // if ( !isValidLogin ) {
        //     console.log('credenciales manuales incorrectas');
        // }

    }


    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={ handleSubmit(onLoginUser) } autoComplete='off' noValidate>
                <Box sx={{ width: 350, padding: 5, backgroundColor: 'whitesmoke' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Iniciar Sesión</Typography>
                            <Chip 
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth 
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                    
                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth 
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='secondary'
                                size='large'
                                fullWidth
                                variant='outlined'
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        {/* <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={ router.query.callbackUrl ? `/auth/register?callbackUrl=${ router.query.callbackUrl }`: '/auth/register' } 
                                passHref
                                legacyBehavior
                            >
                                <Link underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid> */}

                            
                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values( providers ).map(( provider: any ) => {
                                    
                                    if ( provider.id === 'credentials' ) return (<div key="credentials"></div>);

                                    return (
                                        <Button
                                            key={ provider.id }
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{ mb: 1 }}
                                            onClick={ () => signIn( provider.id ) }
                                        >
                                            { provider.name }
                                        </Button>
                                    )

                                })
                            }

                        </Grid>

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
  )
}



// // You should use getServerSideProps when:
// // - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });

    const { callbackUrl = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: callbackUrl.toString(),
                permanent: false
            }
        }
    }


    return {
        props: { }
    }
}



export default LoginPage