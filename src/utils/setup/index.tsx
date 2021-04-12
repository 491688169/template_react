/*
 * @Author: Kim
 * @Date: 2021-04-12 09:32:50
 * @LastEditTime: 2021-04-12 16:07:55
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/setup/index.tsx
 */
import { render } from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";

import renderRoutes, { IRoute } from "@/utils/renderRoutes";
import ScrollToTop from "@/components/ScrollToTop";

interface IStart {
    routes: IRoute[];
    basename?: string;
    history?: "hash" | "browser";
}

const G = {
    token: "",
};

window.G = G;

export default function start({ routes, basename, history = "browser" }: IStart) {
    const historyObj =
        history === "hash" ? createHashHistory({ basename }) : createBrowserHistory({ basename });
    render(
        <ConfigProvider locale={zhCN}>
            <Router history={historyObj}>
                <ScrollToTop />
                {renderRoutes(routes)}
            </Router>
        </ConfigProvider>,
        document.querySelector("#root")
    );
}
