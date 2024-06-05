import axios from "axios";

export const useApi = () => {

    return axios.create({
        baseURL: 'http://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};