/*
 * @Author: Kim
 * @Date: 2021-04-14 11:22:18
 * @LastEditTime: 2021-04-14 11:26:35
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/authorized/Authorized.ts
 */
import renderAuthorized from "@/components/Authorized";
import { getAuthority } from "./authority";

const Authorized = renderAuthorized(getAuthority());

export const reloadAuthorized = () => {
    return renderAuthorized(getAuthority());
};

export default Authorized;
