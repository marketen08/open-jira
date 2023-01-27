import useSWR, { SWRConfiguration } from 'swr';
import { baseURL } from '../apiAxios';
import { Cliente } from '../interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

type IClientesResumen = {
    total: number,
    clientes: Cliente[]
}

export function useClientes( url: string ) {
    
    const tokenCookies = Cookies.get('token')?.toString();

    const fetcher = (url:string, token:string) => axios.get(url, { headers: { 'x-token': tokenCookies } })
      .then((res) => res.data);
    
    const { data, error } = useSWR<IClientesResumen>(`${baseURL}${url}`, fetcher );

    return {
        clientesResumen: data,
        isLoading: !error && !data,
        isError: error
    };

}