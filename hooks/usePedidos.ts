import useSWR, { SWRConfiguration } from 'swr';
import { baseURL } from '../apiAxios';
import { Pedido } from '../interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

type IPedidosResumen = {
    total: number,
    pedidos: Pedido[]
}

export function usePedidos( url: string ) {
    
    const tokenCookies = Cookies.get('token')?.toString();

    const fetcher = (url:string, token:string) => axios.get(url, { headers: { 'x-token': tokenCookies } })
      .then((res) => res.data);
    
    const { data, error } = useSWR<IPedidosResumen>(`${baseURL}${url}`, fetcher );

    return {
        pedidosResumen: data,
        isLoading: !error && !data,
        isError: error
    };

}