import axios from 'axios';

export const baseURL: string = 'http://localhost:8080/api';

const externalApi = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQzMzAwOTQsImV4cCI6MTY3NDQxNjQ5NH0.J5FMnMxgUATM4Q6CV3FKcPeo6M7CZUWuUKHRLlYPGP8'
    }
    
})

export default externalApi;