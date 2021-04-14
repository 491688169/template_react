/*
 * @Author: Kim
 * @Date: 2021-04-14 10:26:04
 * @LastEditTime: 2021-04-14 10:59:35
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/components/Authorized/index.tsx
 */
import Authorized from "./Authorized";
import withCurrAuthority from "./WithCurrAuthority";

const renderAuthorized = withCurrAuthority(Authorized);

export default renderAuthorized;
