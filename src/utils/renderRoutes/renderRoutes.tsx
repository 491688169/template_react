/*
 * @Author: Kim
 * @Date: 2021-04-09 18:01:49
 * @LastEditTime: 2021-04-09 19:47:09
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/renderRoutes/renderRoutes.tsx
 */
import { FunctionComponent } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

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

function render({ route, extraProps }: { route: IRoute; extraProps?: object }) {}

function getRouteElement({ route, extraProps, index }: IGetRouteElement) {
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
                return render({ route, extraProps });
            }}
        />
    );
}

export default function renderRoutes(routes: IRoute[], extraProps = {}, switchProps = {}) {
    return routes ? (
        <Switch {...switchProps}>
            {routes.map((route, index) => {
                return getRouteElement({ route, extraProps, index });
            })}
        </Switch>
    ) : null;
}
