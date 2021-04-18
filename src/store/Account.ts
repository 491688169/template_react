import { runInAction, makeAutoObservable } from "mobx";

import { accountLogin } from "@/services/auth";
import storage from "@/utils/storage";

export default class Account {
    orgId = null;
    userId = null;
    token = G.token;

    constructor() {
        makeAutoObservable(this);
    }

    async login() {
        const data = await accountLogin({
            orgId: 1000650,
            password: "abc123",
            systemId: 4,
            username: "15901876409",
        });
        const {
            access_token: token,
            orgId,
            user: { id },
        } = data;
        storage.set(`token`, token);
        runInAction(() => {
            this.orgId = orgId;
            this.token = token;
            this.userId = id;
        });
        return data;
    }
}
