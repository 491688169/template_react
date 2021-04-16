/*
 * @Author: Kim
 * @Date: 2021-04-06 14:13:29
 * @LastEditTime: 2021-04-16 10:11:31
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/pages/Login/index.tsx
 */
import { useEffect } from "react";

import { accountLogin } from "@/services/auth";
import storage from "@/utils/storage";
import { setAuthority } from "@/utils/authorized/authority";
import { PATH } from "@/configs/routes.config";

import styles from "./index.scss";

export default function Login() {
    async function login() {
        const data = await accountLogin({
            orgId: 1000650,
            password: "abc123",
            systemId: 4,
            username: "15901876409",
        });
        const { access_token: token } = data;
        storage.set(`token`, token);
    }

    useEffect(() => {
        login();
    }, []);

    function handleClick() {
        setAuthority({ value: 123 });
        G.gotoPage(PATH.HOME);
    }

    return (
        <div className={styles.container}>
            login
            <button onClick={handleClick}>set auth</button>
        </div>
    );
}
