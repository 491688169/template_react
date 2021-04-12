import { useEffect } from "react";
import { useLocation } from "react-router";

/*
 * @Author: Kim
 * @Date: 2021-04-12 16:03:53
 * @LastEditTime: 2021-04-12 16:07:00
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/components/ScrollToTop/index.tsx
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
