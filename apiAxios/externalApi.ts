import axios from 'axios';

export const baseURL: string = 'http://localhost:8080/api';

const externalApi = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQ2NTMwOTksImV4cCI6MTY3NDczOTQ5OX0.Qxeb4PnhBUmvHK4uP4hqe-5wLUn7rm998u7WmfXKGCI'
    }
    
})

export default externalApi;