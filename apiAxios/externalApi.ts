import axios from 'axios';

export const baseURL: string = 'http://localhost:8080/api'

const externalApi = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M0OTc5YmZjYWFhODEyZmFjMzFlN2YiLCJpYXQiOjE2NzQwODE1NzQsImV4cCI6MTY3NDE2Nzk3NH0.6SAhPLWOsYHAeOoXtGn3AYD0K8Bm91jAgfDivBOuDeI' 
    }
    
})

export default externalApi;