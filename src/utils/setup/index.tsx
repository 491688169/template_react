import { render } from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";

import renderRoutes, { IRoute } from "../renderRoutes";
import "@/utils/storage";
import { createRequestInstance, ICreateRequestInstance } from "@/utils/request";

interface IStart extends ICreateRequestInstance {
    routes: IRoute[];
    basename?: string;
    history?: "hash" | "browser";
}

const G = {
    token: "",
};

window.G = G;

export default function start({ routes, basename, history = "browser", alert, baseURL }: IStart) {
    createRequestInstance({ alert, baseURL });
    const historyObj =
        history === "hash" ? createHashHistory({ basename }) : createBrowserHistory({ basename });
    render(
        <ConfigProvider locale={zhCN}>
            <Router history={historyObj}>{renderRoutes(routes)}</Router>
        </ConfigProvider>,
        document.querySelector("#root")
    );
}
