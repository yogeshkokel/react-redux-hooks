import axios from 'axios';
import { BASEURL } from "../config";

export default () => {
    const instance = axios.create({
        baseURL: `${BASEURL}`
    })
    // instance.defaults.headers.common["Authorization"] = 'JWT_TOKEN';
    // instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
    return instance;
}

