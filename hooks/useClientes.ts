import useSWR, { SWRConfiguration } from 'swr';
import { baseURL } from '../apiAxios/externalApi';
import { Cliente } from '../interfaces';



// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export function useClientes(url: string, config: SWRConfiguration = {}) {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<Cliente[]>(`${baseURL}${url}`, config);

    return {
        clientes: data || [],
        isLoading: !error && !data,
        isError: error
    };

}