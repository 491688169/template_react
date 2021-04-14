/*
 * @Author: Kim
 * @Date: 2021-04-12 18:56:47
 * @LastEditTime: 2021-04-14 13:44:02
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/components/Authorized/checkPermission.tsx
 */
import _ from "lodash";

import PromiseRender from "./PromiseRender";
import { CURRENT } from "./WithCurrAuthority";

export type IAuthorityType =
    | undefined
    | string
    | string[]
    | number
    | number[]
    | Promise<boolean>
    | Function;

type ICurrAuthorityType = typeof CURRENT;

interface ICheckPermission<T, K> {
    authority: IAuthorityType;
    currentAuthority: ICurrAuthorityType;
    target: T;
    Exeception: K;
}

export const checkPermission = <T, K>({
    authority,
    currentAuthority,
    target,
    Exeception,
}: ICheckPermission<T, K>): T | K | React.ReactNode => {
    if (!authority) {
        return target;
    }

    if (typeof authority === "string" || Array.isArray(authority)) {
        const authorityArr = Array.isArray(authority) ? authority : [authority];
        const currAuthorityArr = Array.isArray(currentAuthority)
            ? currentAuthority
            : [currentAuthority];

        const intersection = _.intersection(authorityArr, currAuthorityArr);

        return intersection.length > 0 ? target : Exeception;
    }

    if (authority instanceof Promise) {
        return <PromiseRender ok={target} error={Exeception} promise={authority} />;
    }

    if (typeof authority === "function") {
        const bool = authority(currentAuthority);
        if (bool instanceof Promise) {
            return <PromiseRender ok={target} error={Exeception} promise={bool} />;
        }
        if (bool) {
            return target;
        }
        return Exeception;
    }

    throw new Error("unsupported parameters");
};

export default function check<T, K>({
    authority,
    target,
    Exeception,
}: Pick<ICheckPermission<T, K>, "authority" | "target" | "Exeception">): T | K | React.ReactNode {
    return checkPermission({ authority, currentAuthority: CURRENT, target, Exeception });
}
