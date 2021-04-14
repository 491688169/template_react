/*
 * @Author: Kim
 * @Date: 2021-04-09 18:01:49
 * @LastEditTime: 2021-04-14 13:43:21
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/renderRoutes/index.tsx
 */
import { FunctionComponent, createElement } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { IAuthorityType } from "@/components/Authorized/CheckPermission";
import Authorized from "@/utils/authorized/Authorized";

export interface IRoute {
    path?: string;
    exact?: boolean;
    redirect?: string;
    component?: IComponent;
    routes?: IRoute[];
    key?: any;
    strict?: boolean;
    sensitive?: boolean;
    wrappers?: any[];
    authority?: IAuthorityType;
    [k: string]: any;
}

interface IGetRouteElement {
    route: IRoute;
    extraProps?: object;
    index?: number;
}

export interface IComponent extends FunctionComponent {
    getInitialProps?: Function;
    preload?: () => Promise<any>;
}

function render({ route, props }: { route: IRoute; props?: any }) {
    const routes = renderRoutes(route.routes || [], { location: props.location });
    const { component: Component, wrappers, authority } = route;
    if (Component) {
        const newProps = {
            ...props,
            route,
        };
        let ret = <Component {...newProps} />;

        if (wrappers) {
            let len = wrappers.length - 1;
            while (len >= 0) {
                ret = createElement(wrappers[len], newProps, ret);
                len -= 1;
            }
        }

        if (authority) {
            ret = createElement(Authorized, { ...newProps, authority }, ret);
        }

        return ret;
    } else {
        return routes;
    }
}

function getRouteElement({ route, index }: IGetRouteElement) {
    const routeProps = {
        key: route.key || index,
        exact: route.exact,
        strict: route.strict,
        sensitive: route.sensitive,
        path: route.path,
    };

    if (route.redirect) {
        return (
            <Redirect
                {...routeProps}
                key={route.key || index}
                from={route.path}
                to={route.redirect}
            />
        );
    }

    return (
        <Route
            {...routeProps}
            render={(props: object) => {
                return render({ route, props });
            }}
        />
    );
}

export default function renderRoutes(routes: IRoute[], switchProps = {}) {
    return routes ? (
        <Switch {...switchProps}>
            {routes.map((route, index) => {
                return getRouteElement({ route, index });
            })}
        </Switch>
    ) : null;
}
