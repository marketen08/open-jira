import { FC, useReducer, useEffect, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';

import { AuthContext, authReducer } from './';

import { externalApiConToken, externalApiSinTocken } from '../../apiAxios';
import { IUsuario } from '../../interfaces';

interface Props {
    children: ReactNode
}

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUsuario;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const { data, status } = useSession();
    // const router = useRouter();

    useEffect(() => {
      if ( status === 'authenticated' ) {
          // Disparo el checkToken porque estoy usando NextAuth + token en cada uno de los llamados al backend
          checkToken();

        // Usando unicamente NextAuth
        // dispatch({ type: '[Auth] - Login', payload: data?.user as IUsuario })
      }
    }, [ status, data ])


    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            logout();
            return;
        }

        try {
            const { data } = await externalApiConToken.get('/login/renew');
            const { token, usuario } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: usuario as IUsuario });
        } catch (error) {
            Cookies.remove('token');
            console.log('eror en renew')
        }
    }
    


    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await externalApiSinTocken.post('/login', { email, password });
            const { token, usuario } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: usuario });
            return true;
        } catch (error) {
            return false;
        }

    }


    const registerUser = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await externalApiConToken.post('/login/new', { name, email, password });
            const { token, usuario } = data;
            // LAS SIGUIENTES LINEAS SON PARA LOGUEAR CON EL USUARIO QUE SE REGISTRA
            // Cookies.set('token', token );
            // dispatch({ type: '[Auth] - Login', payload: usuario });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }


    const logout = () => {
        // Cookies.remove('cart');
        // Cookies.remove('firstName');
        // Cookies.remove('lastName');
        // Cookies.remove('address');
        // Cookies.remove('address2');
        // Cookies.remove('zip');
        // Cookies.remove('city');
        // Cookies.remove('country');
        // Cookies.remove('phone');
        Cookies.remove('token');
        
        signOut();
        // router.reload();
    }



    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
};