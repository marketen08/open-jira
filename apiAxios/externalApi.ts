import axios from 'axios';

export const baseURL: string = 'http://localhost:8080/api';

const externalApi = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQ1MDAzNTUsImV4cCI6MTY3NDU4Njc1NX0.x_uMi01U8FgHBa3FaSQ45xbQ_cI9XPUZbREDORhevb4'
    }
    
})

export default externalApi;