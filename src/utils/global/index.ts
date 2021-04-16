/*
 * @Author: Kim
 * @Date: 2021-04-15 15:26:50
 * @LastEditTime: 2021-04-16 10:09:24
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/global/index.ts
 */
import { PATH } from "@/configs/routes.config";

export function gotoSignIn() {
    G.history?.push(PATH.LOGIN);
}

export function gotoPage(page: PATH, state?: object) {
    G.history.push(page, state);
}
