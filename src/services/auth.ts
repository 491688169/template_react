/*
 * @Author: Kim
 * @Date: 2021-04-12 09:32:50
 * @LastEditTime: 2021-04-15 15:55:14
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/services/auth.ts
 */
import request from "@/utils/request";

interface IAccountLogin {
    orgId: number;
    password: string;
    systemId: number;
    username: string;
}

export async function accountLogin({
    orgId,
    password,
    systemId,
    username,
}: IAccountLogin): Promise<any> {
    return request("/auth/user/loginKupeiStudent", {
        method: "POST",
        data: {
            orgId,
            password,
            systemId,
            username,
        },
    });
}
