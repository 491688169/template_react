import axios from "axios";
import { message } from "antd";

const alert = message.error;

const instance = axios.create({
    baseURL: `${__BACKEND__}/v1/`,
    timeout: 10000,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: G.token ? `Bearer ${G.token}` : "Bearer ",
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

export default instance;
