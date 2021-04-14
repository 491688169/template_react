/*
 * @Author: Kim
 * @Date: 2021-04-14 10:23:48
 * @LastEditTime: 2021-04-14 10:58:27
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/components/Authorized/WithCurrAuthority.tsx
 */

let CURRENT: string | string[] | number | number[] = "NULL";

type TCurrentAuthority = typeof CURRENT | (() => typeof CURRENT);

const WithCurrAuthority = <T,>(Authorized: T): ((currentAuthority: TCurrentAuthority) => T) => (
    currentAuthority: TCurrentAuthority
): T => {
    if (currentAuthority) {
        if (typeof currentAuthority === "function") {
            CURRENT = currentAuthority();
        }
        if (
            typeof currentAuthority === "string" ||
            typeof currentAuthority === "number" ||
            Array.isArray(currentAuthority)
        ) {
            CURRENT = currentAuthority as typeof CURRENT;
        }
    } else {
        CURRENT = "NULL";
    }
    return Authorized;
};

export default WithCurrAuthority;
export { CURRENT };
