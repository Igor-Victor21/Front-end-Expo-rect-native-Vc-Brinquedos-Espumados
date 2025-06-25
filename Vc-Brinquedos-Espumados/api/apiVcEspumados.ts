import axios from 'axios';

export const apiVcEspumados = axios.create({
    baseURL: "http://localhost:5555"
});