import { render } from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";

import renderRoutes, { IRoute } from "../renderRoutes";

interface IStart {
    routes: IRoute[];
    basename?: string;
    history?: "hash" | "browser";
}

export default function start({ routes, basename, history = "browser" }: IStart) {
    const historyObj =
        history === "hash" ? createHashHistory({ basename }) : createBrowserHistory({ basename });
    render(
        <ConfigProvider locale={zhCN}>
            <Router history={historyObj}>{renderRoutes(routes)}</Router>
        </ConfigProvider>,
        document.querySelector("#root")
    );
}
