// import { useSession } from 'next-auth/react';
import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_AXIOS_BASEURL;

interface IFetch {
    endpoint: string;
    data: any;
    method: string;
}

const axiosConToken = ( endpoint:string, data:{}|[] = {}, method:string = 'GET', token:string = '' ) => {

    // const session = useSession();

    // console.log(session)

    const url = `${ baseUrl }${ endpoint }`;

    if ( method === 'GET' ){
        return axios( url, {
            method,
            headers: {
                'x-token': token
            }
        } );
    } else {
        return axios( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            data: JSON.stringify( data )
        });
    }
}

export {
    axiosConToken
}