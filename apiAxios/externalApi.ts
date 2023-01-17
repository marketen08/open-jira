import axios from 'axios';

const externalApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 1000,
    headers: {
        'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2M0OTc5YmZjYWFhODEyZmFjMzFlN2YiLCJpYXQiOjE2NzM5ODIwNTYsImV4cCI6MTY3NDA2ODQ1Nn0.j6c3KaNm5xnV_aB2BxtGNLANQFOWBKqSebYawZJcY3c' 
    }
    
})

export default externalApi;