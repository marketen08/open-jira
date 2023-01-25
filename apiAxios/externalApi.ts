import axios from 'axios';

export const baseURL: string = 'http://localhost:8080/api';

const externalApi = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQ2MTA0NzcsImV4cCI6MTY3NDY5Njg3N30.wOdeR8sDBuWUibW2_NL4gO3eldSjttPHAHM5mcGVCDw'
    }
    
})

export default externalApi;