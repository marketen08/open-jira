import axios from 'axios';

export const baseURL: string = 'http://localhost:8080/api';

const externalApi = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQyMTY5NDYsImV4cCI6MTY3NDMwMzM0Nn0.zDfMPEqBFMhcNaZgbZC6jQEx6-X0vjpGHNfJuFu-KIk'
    }
    
})

export default externalApi;