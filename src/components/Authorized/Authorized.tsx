/*
 * @Author: Kim
 * @Date: 2021-04-13 17:15:40
 * @LastEditTime: 2021-04-14 13:38:57
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/components/Authorized/Authorized.tsx
 */
import React from "react";
import { Result } from "antd";

import check, { IAuthorityType } from "./CheckPermission";

interface IAuthorized {
    authority: IAuthorityType;
    nomatch?: React.ReactNode;
}

const Authorized: React.FunctionComponent<IAuthorized> = ({
    authority,
    nomatch = <Result status="403" title="403" subTitle="对不起，你没有权限访问该页面" />,
    children,
}) => {
    const childrenRender = typeof children === "undefined" ? null : children;
    const dom = check({ authority, target: childrenRender, Exeception: nomatch });
    return <>{dom}</>;
};

export default Authorized;
