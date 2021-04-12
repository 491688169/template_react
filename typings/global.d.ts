/*
 * @Author: Kim
 * @Date: 2021-04-12 09:32:50
 * @LastEditTime: 2021-04-12 09:42:09
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/typings/global.d.ts
 */
/* eslint-disable */
declare const __PRODUCT__: string;
declare const __BACKEND__: string;

interface IG {
    token: string
}

interface Window {
    G: IG
}

declare const G: IG

interface StoreJsAPI {
    _namespacePrefix: string
}

declare module "*.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

