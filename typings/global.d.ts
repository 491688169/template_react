/*
 * @Author: Kim
 * @Date: 2021-04-12 09:32:50
 * @LastEditTime: 2021-04-15 15:41:11
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/typings/global.d.ts
 */
import { IG } from "@/utils/setup";
declare global {
    let __PRODUCT__: string;
    const __BACKEND__: string;
    const G: IG;

    interface Window {
        G: IG;
    }
    module "*.scss" {
        const classes: { readonly [key: string]: string };
        export default classes;
    }

    interface StoreJsAPI {
        _namespacePrefix: string;
    }
}
