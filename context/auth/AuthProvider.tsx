import { FC, useReducer, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

import axios from 'axios';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';

import { externalApi } from '../../apiAxios';
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
    const router = useRouter();

    useEffect(() => {
      if ( status === 'authenticated' ) {
        console.log({user: data?.user, status}, 'es por aca');
        dispatch({ type: '[Auth] - Login', payload: data?.user as IUsuario })
      }
    
    }, [ status, data ])


    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return;
        }

        try {
            const { data } = await externalApi.get('/login/renew');
            const { token, usuario } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: usuario });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await externalApi.post('/login', { email, password });
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
            const { data } = await externalApi.post('/login/new', { name, email, password });
            const { token, usuario } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: usuario });
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
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
        
        signOut();
        // router.reload();
        // Cookies.remove('token');
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