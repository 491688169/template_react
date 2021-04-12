/*
 * @Author: Kim
 * @Date: 2021-04-12 18:56:47
 * @LastEditTime: 2021-04-12 19:50:11
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/components/Authorized/checkPermission.tsx
 */
import { ReactNode } from "react";
import _ from "lodash";

import { isPromise } from "@/utils/util";

interface ICheckPermission {
    authority: (string | number)[] | string | number;
    currentAuthority: (string | number)[] | string | number;
    target: ReactNode;
    Exeception: ReactNode;
}

export function checkPermission({
    authority,
    currentAuthority,
    target,
    Exeception,
}: ICheckPermission) {
    if (!authority) {
        return target;
    }
    const authorityArr = Array.isArray(authority) ? authority : [authority];
    const currAuthorityArr = Array.isArray(currentAuthority)
        ? currentAuthority
        : [currentAuthority];

    const intersection = _.intersection(authorityArr, currAuthorityArr);

    return intersection.length > 0 ? target : Exeception;
}
