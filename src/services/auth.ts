import request from "@/utils/request";

interface IAccountLogin {
    orgId: number;
    password: string;
    systemId: number;
    username: string;
}

export function accountLogin({ orgId, password, systemId, username }: IAccountLogin) {
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
