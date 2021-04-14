/*
 * @Author: Kim
 * @Date: 2021-04-12 19:47:35
 * @LastEditTime: 2021-04-13 17:16:22
 * @LastEditors: Kim
 * @Description:
 * @FilePath: /template_react/src/components/Authorized/promiseRender.tsx
 */
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
interface IPromiseRender<T, K> {
    ok: T;
    error: K;
    promise: Promise<boolean>;
}

const PromiseRender = <T, K>({ ok, error, promise, ...rest }: IPromiseRender<T, K>) => {
    const [component, setComponent] = useState<ReturnType<typeof checkIsInstantiation>>(() => null);

    useEffect(() => {
        const okComponent = checkIsInstantiation(ok);
        const errorComponent = checkIsInstantiation(error);

        promise
            .then(() => {
                setComponent(okComponent);
            })
            .catch(() => {
                setComponent(errorComponent);
            });
    }, [ok, error, promise]);

    const Component = component;
    return Component ? (
        <Component {...rest} />
    ) : (
        <div
            style={{
                width: "100%",
                height: "100%",
                margin: "auto",
                paddingTop: 50,
                textAlign: "center",
            }}
        >
            <Spin size="large" />
        </div>
    );
};

function checkIsInstantiation(target: React.ReactNode | React.ComponentClass) {
    if (isComponentClass(target)) {
        const Target = target as React.ComponentClass;
        const TargetComponent = (props: any) => <Target {...props} />;
        return TargetComponent;
    }
    if (React.isValidElement(target)) {
        const TargetComponent = (props: any) => React.cloneElement(target, props);
        return TargetComponent;
    }
    return () => target as React.ReactNode & null;
}

function isComponentClass(component: React.ReactNode | React.ComponentClass): boolean {
    if (!component) return false;
    const proto = Object.getPrototypeOf(component);
    if (proto === React.Component || proto === Function.prototype) return true;
    return isComponentClass(proto);
}

export default PromiseRender;
