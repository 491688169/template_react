/*
 * @Author: Kim
 * @Date: 2021-04-15 15:26:50
 * @LastEditTime: 2021-04-17 12:45:10
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/setup/history.tsx
 */
import { History } from "history";
import { PATH } from "@/configs/routes.config";

export function gotoSignIn() {
    G.history?.push(PATH.LOGIN);
}

export function gotoPage(page: PATH, state?: object) {
    G.history.push(page, state);
}

export function Push(this: History, page: PATH, state?: object, advanced: boolean = true) {
    if (advanced) {
        return;
    }
    this.push(page, state);
}
