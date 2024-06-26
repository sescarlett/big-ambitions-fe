import axios from "axios";

export const useApi = () => {

    return axios.create({
        baseURL: 'https://big-ambitions-api-dlvg7ncywa-uc.a.run.app/api',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
