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

import renderRoutes, { IRoute } from "@/utils/renderRoutes";
import { gotoSignIn, gotoPage, Push as push } from "./history";
import ScrollToTop from "@/components/ScrollToTop";
import React, { useEffect, useState } from "react";

interface IStart {
    routes: IRoute[];
    basename?: string;
    history?: "hash" | "browser";
    withAntd?: boolean;
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

export default function start({ routes, basename, history = "browser", withAntd = false }: IStart) {
    const customHistory =
        history === "hash" ? createHashHistory({ basename }) : createBrowserHistory({ basename });
    G.history = customHistory;
    G.history.push = push;

    render(
        <AntdWrapper withAntd={withAntd}>
            <Router history={customHistory}>
                <ScrollToTop />
                {renderRoutes(routes)}
            </Router>
        </AntdWrapper>,
        document.querySelector("#root")
    );
}

const AntdWrapper: React.FunctionComponent<{ withAntd: boolean }> = ({ withAntd, children }) => {
    const [Wrapper, setWrapper] = useState<React.FunctionComponent>(function (props) {
        return <div {...props}></div>;
    });
    const [wrapperProps, setWrapperProps] = useState<object>();

    useEffect(() => {
        async function renderWrapper() {
            const [configProvider, zhCN] = await Promise.all([
                (await import("antd/es/config-provider")).default,
                (await import("antd/es/locale/zh_CN")).default,
            ]);
            setWrapper(configProvider);
            setWrapperProps({ locale: zhCN });
        }

        if (withAntd) {
            renderWrapper();
        }
    }, [withAntd]);

    console.log("Wrapper", Wrapper);
    return <Wrapper {...wrapperProps}>{children}</Wrapper>;
};
