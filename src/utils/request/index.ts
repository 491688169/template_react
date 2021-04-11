import axios, { AxiosInstance } from "axios";

export interface ICreateRequestInstance {
    alert?: Function;
    baseURL: string;
    timeout?: number;
}

let request: AxiosInstance;
export default request;

export function createRequestInstance({
    alert = window.alert,
    baseURL,
    timeout,
}: ICreateRequestInstance) {
    const instance = axios.create({
        baseURL,
        timeout,
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: G.token && `Bearer ${G.token}`,
        },
    });

    instance.interceptors.response.use(
        function (response) {
            const { code, data, message } = response.data;

            if (code === "0") {
                return data;
            } else if (code !== "0" && message) {
                alert(message);
            }
        },
        function (error) {
            if (error.response.status === 401) {
                // 返回登录
            } else if (error.response.message) {
                alert(error.response.message);
            } else {
                alert("系统正在更新，请稍后重试");
            }
            return Promise.reject(error);
        }
    );
    request = instance;
}
