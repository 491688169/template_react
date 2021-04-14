/*
 * @Author: Kim
 * @Date: 2021-04-12 09:32:50
 * @LastEditTime: 2021-04-14 13:49:50
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/configs/routes.config.ts
 */
import { IRoute } from "@/utils/renderRoutes";
import Login from "@/pages/Login";
import Home from "@/pages/Home";

const routes: IRoute[] = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/home",
        authority: [123],
        component: Home,
    },
];

export default routes;
