/*
 * @Author: Kim
 * @Date: 2021-04-06 14:13:29
 * @LastEditTime: 2021-04-09 19:11:00
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/pages/Login/index.tsx
 */
import { useEffect } from "react";

import { accountLogin } from "@/services/auth";
import storage from "@/utils/storage";

import styles from "./index.scss";

export default function Login() {
    useEffect(async () => {
        const data = await accountLogin({
            orgId: 1000650,
            password: "abc123",
            systemId: 4,
            username: "15901876409",
        });
        const {
            access_token: token,
            user: { id },
        } = data;
        storage.set(`token`, token);
    }, []);

    return <div className={styles.container}>login</div>;
}
