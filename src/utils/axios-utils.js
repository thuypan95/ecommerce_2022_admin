import { message } from "antd";
import axios from "axios";
import { urlBackend } from "../api/config";


const client = axios.create({ baseURL: urlBackend });
export const request = ({ ...options }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser?.jwt;
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
    const onSuccess = response => response;
    const onError = error => {
        if (error.response.status === 401) {
            message.error(`${error.response.data.message} Please login again!`);
            setTimeout(() => {
                localStorage.removeItem("currentUser");
                window.location.reload();
            }, 500)

        }
        return error;
    }
    return client(options).then(onSuccess).catch(onError);
}