/*
 * @Author: Kim
 * @Date: 2021-04-14 13:48:41
 * @LastEditTime: 2021-04-15 16:09:19
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/pages/Home/index.tsx
 */

import { PATH } from "@/configs/routes.config";

export default function Home() {
    console.log("home");

    function handleClick() {
        G.gotoPage(PATH.HOME);
    }
    return (
        <div>
            Home
            <button onClick={handleClick}>click</button>
        </div>
    );
}
