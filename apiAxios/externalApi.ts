import axios from 'axios';
import Cookies from 'js-cookie';

export const baseURL: string = 'http://localhost:8080/api';

const token = Cookies.get('token');

export const externalApiConToken = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        'x-token': token ? token : ''
    }
    
});

export const externalApiSinTocken = axios.create({
    baseURL: baseURL,
    timeout: 20000,
});
