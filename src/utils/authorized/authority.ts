/*
 * @Author: Kim
 * @Date: 2021-04-14 11:07:35
 * @LastEditTime: 2021-04-14 11:26:44
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/authorized/authority.ts
 */
import storage from "@/utils/storage";
import { reloadAuthorized } from "./Authorized";

export function getAuthority(key = "authority") {
    const authorityStr = storage.get(key);
    let authority;
    try {
        authority = JSON.parse(authorityStr);
    } catch (err) {
        authority = authorityStr;
    }

    if (typeof authority === "string" || typeof authority === "number") {
        return [authority];
    }

    return authority;
}

export function setAuthority({ key = "authority", value }: { key?: string; value: any }) {
    const authority = typeof value === "string" || typeof value === "number" ? [value] : value;
    storage.set(key, authority);
    reloadAuthorized();
}
