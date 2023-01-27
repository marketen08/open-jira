import { useState, useContext } from 'react';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline, Router } from '@mui/icons-material';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { useRouter } from 'next/router';


type FormData = {
    email   : string,
    password: string,
  };


const LoginPage = () => {

    const { loginUser } = useContext( AuthContext );

    const router = useRouter();

    const [ showError, setShowError ] = useState(false);

    const onLoginUser = async( ) => {

        const email = 'marcos@gmail.com'
        const password = '123456'

        const isValidLogin = await loginUser( email, password );

        if ( !isValidLogin ) {
            console.log('Credenciales incorrectas');
            return;
        }

        router.replace('/');

    }


    return (
        <AuthLayout title={'Ingresar'}>
                <Box sx={{ width: 350, padding:'10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
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
                                // { ...register('email', {
                                //     required: 'Este campo es requerido',
                                //     validate: validations.isEmail
                                    
                                // })}
                                // error={ !!errors.email }
                                // helperText={ errors.email?.message }
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth 
                                // { ...register('password', {
                                //     required: 'Este campo es requerido',
                                //     minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                // })}
                                // error={ !!errors.password }
                                // helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth
                                onClick={ onLoginUser }
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="/auth/register" passHref legacyBehavior>
                                <Link underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
        </AuthLayout>
  )
}

export default LoginPage