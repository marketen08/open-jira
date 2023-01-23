import axios from 'axios';

export const baseURL: string = 'http://localhost:8080/api';

const externalApi = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQ1MDI3MDIsImV4cCI6MTY3NDU4OTEwMn0.o2gY5kyaQ95ZXOHaEMASFjNUiw6z1PtFVDok1T62XSM'
    }
    
})

export default externalApi;