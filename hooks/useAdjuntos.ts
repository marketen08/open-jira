import useSWR, { SWRConfiguration } from 'swr';
import { baseURL } from '../apiAxios';
import { Adjunto } from '../interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';

type IAdjuntosResumen = {
    total: number,
    adjuntos: Adjunto[]
}

export function useAdjuntos( url: string ) {
    
    const tokenCookies = Cookies.get('token')?.toString();

    const fetcher = (url:string, token:string) => axios.get(url, { headers: { 'x-token': tokenCookies } })
      .then((res) => res.data);
    
    const { data, error } = useSWR<IAdjuntosResumen>(`${baseURL}${url}`, fetcher );

    return {
        adjuntosResumen: data,
        isLoading: !error && !data,
        isError: error
    };

}