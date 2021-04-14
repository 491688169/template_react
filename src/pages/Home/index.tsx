/*
 * @Author: Kim
 * @Date: 2021-04-14 13:48:41
 * @LastEditTime: 2021-04-14 18:46:27
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/pages/Home/index.tsx
 */
import { useHistory } from "react-router-dom";

export default function Home() {
    console.log("home");
    const history = useHistory();

    function handleClick() {
        history.push("/home");
    }
    return (
        <div>
            Home
            <button onClick={handleClick}>click</button>
        </div>
    );
}
