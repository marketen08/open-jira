import useSWR, { SWRConfiguration } from 'swr';
import { baseURL } from '../apiAxios';
import { Vehiculo } from '../interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

type IVehiculosResumen = {
    total: number,
    vehiculos: Vehiculo[]
}

export function useVehiculos( url: string ) {
    
    const tokenCookies = Cookies.get('token')?.toString();

    const fetcher = (url:string, token:string) => axios.get(url, { headers: { 'x-token': tokenCookies } })
      .then((res) => res.data);
    
    const { data, error } = useSWR<IVehiculosResumen>(`${baseURL}${url}`, fetcher );

    return {
        vehiculosResumen: data,
        isLoading: !error && !data,
        isError: error
    };

}