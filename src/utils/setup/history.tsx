/*
 * @Author: Kim
 * @Date: 2021-04-15 15:26:50
 * @LastEditTime: 2021-04-17 12:45:10
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/setup/history.tsx
 */
import { createPath } from "history";
import { PATH } from "@/configs/routes.config";

export function gotoSignIn() {
    push(PATH.LOGIN);
}

export function gotoPage(page: PATH, state?: object) {
    push(page, state);
}

export function push(page: PATH, state?: object) {
    if (typeof page === "string" && page === createPath(G.history.location)) {
        console.warn("page not change.");
        return;
    }
    G.history.push(page, state);
}
