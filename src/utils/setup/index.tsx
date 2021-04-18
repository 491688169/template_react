/*
 * @Author: Kim
 * @Date: 2021-04-12 09:32:50
 * @LastEditTime: 2021-04-17 12:53:51
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/setup/index.tsx
 */
import { render } from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory, createHashHistory, History } from "history";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";

import renderRoutes, { IRoute } from "@/utils/renderRoutes";
import { gotoSignIn, gotoPage } from "./history";
import ScrollToTop from "@/components/ScrollToTop";

interface IStart {
    routes: IRoute[];
    basename?: string;
    history?: "hash" | "browser";
}

interface IG {
    gotoPage: typeof gotoPage;
    gotoSignIn: typeof gotoSignIn;
    history?: History;
}

const G: IG = {
    gotoSignIn,
    gotoPage,
};

window.G = G;

export default function start({ routes, basename, history = "browser" }: IStart) {
    const customHistory =
        history === "hash" ? createHashHistory({ basename }) : createBrowserHistory({ basename });
    G.history = customHistory;

    render(
        <ConfigProvider locale={zhCN} componentSize="small">
            <Router history={customHistory}>
                <ScrollToTop />
                {renderRoutes(routes)}
            </Router>
        </ConfigProvider>,
        document.querySelector("#root")
    );
}
