import axios from 'axios';

export const baseURL: string = 'http://localhost:8080/api';

const externalApi = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M5OGVhNjVkMjE1NDgwMzdlMGQ1MGIiLCJpYXQiOjE2NzQ0MzU0MjQsImV4cCI6MTY3NDUyMTgyNH0.cGj1PxX9QNJ0Op0lhHk5kzlceK3w1zyIRewzPt__HG8'
    }
    
})

export default externalApi;