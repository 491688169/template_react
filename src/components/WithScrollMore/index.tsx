/*
 * @Author: Kim
 * @Date: 2021-04-14 19:05:04
 * @LastEditTime: 2021-04-14 20:07:03
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/components/WithScrollMore/index.tsx
 */
import React, { useState, useEffect } from "react";

interface IWithScrollMore {
    getMore: Function | Promise<any>;
    containerDom: Element;
}

// 使用示例
// const helloWorld = () => <div>hello world</div>
// const HelloWorldPage = WithScrollMore(helloWorld);
// return <HelloWorldPage getMore={getMore} containerDom={containerDom} />;
const WithScrollMore = (component: React.ComponentType<{ datasource: any }>) => {
    const WrappedScrollMore = ({ getMore, containerDom }: IWithScrollMore) => {
        const Component = component;
        const [dataSource, setDataSource] = useState();
        const [tick, setTick] = useState(0);

        useEffect(() => {
            async function HandleScroll(this: HTMLElement) {
                const MIX_DELTA = 1;
                if (Math.abs(this.scrollHeight - this.scrollTop - this.clientHeight) < MIX_DELTA) {
                    console.log("i need more");
                    if (typeof getMore === "function") {
                        const more = await getMore();
                        setDataSource(more);
                    }
                }
            }
            if (!containerDom) {
                setTick(Math.random());
                return;
            }
            containerDom.addEventListener("scroll", HandleScroll);

            return () => {
                containerDom.removeEventListener("scroll", HandleScroll);
            };
        }, [tick, getMore, containerDom]);

        return <Component datasource={dataSource} />;
    };
    return WrappedScrollMore;
};

export default WithScrollMore;
