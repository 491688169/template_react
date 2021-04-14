import { useHistory, useLocation } from "react-router-dom";
import { createPath } from "history";

import { PATH } from "@/configs/routes.config";

interface IPartialPath {
    pathname?: PATH;
    search?: string;
    hash?: string;
}

export function useSignin() {
    useGotoPage(PATH.LOGIN);
}

export function useGotoPage(page: PATH | IPartialPath) {
    const history = useHistory();
    const location = useLocation();

    if (typeof page === "string" && page === createPath(location)) {
        console.warn("page not change. abort history.push");
        return;
    }
    if (
        Object.prototype.toString.call(page) === "[object Object]" &&
        createPath(page as IPartialPath) === createPath(location)
    ) {
        console.warn("page not change. abort history.push");
        return;
    }

    history.push(page);
}
