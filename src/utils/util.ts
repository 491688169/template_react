/*
 * @Author: Kim
 * @Date: 2021-04-12 19:48:00
 * @LastEditTime: 2021-04-12 20:03:12
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/utils/util.ts
 */

export function isPromise(fn: PromiseLike<any>) {
    return (
        !!fn &&
        (typeof fn === "object" || typeof fn === "function") &&
        typeof fn.then === "function"
    );
}
