import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import AllComponents from "../components";
import routesConfig, { IFMenuBase, IFMenu } from "./config";
import RouteWrapper from "./RouteWrapper";

type CRouterProps = {
    auth: string;
};

const CRouter = (props: CRouterProps) => {
    const { auth } = props;

    const requireLogin = (component: React.ReactElement) => {
        return auth === "admin" ? component : <Redirect to={"/login"} />;
    };
    const createMenu = (r: IFMenu) => {
        const route = (r: IFMenuBase) => {
            const Component = r.component && AllComponents[r.component];
            return (
                <Route
                    key={r.route || r.key}
                    exact
                    path={r.route || r.key}
                    render={(props: any) => {
                        // 重新包装组件
                        const wrapper = (
                            <RouteWrapper {...{ ...props, Comp: Component, route: r }} />
                        );
                        return requireLogin(wrapper);
                    }}
                />
            );
        };

        const subRoute = (r: IFMenu): any =>
            r.subs && r.subs.map((subR: IFMenu) => (subR.subs ? subRoute(subR) : route(subR)));

        return r.component ? route(r) : subRoute(r);
    };
    const createRoute = (key: string) => routesConfig[key].map(createMenu);
    return (
        <Switch>
            {Object.keys(routesConfig).map(key => createRoute(key))}
            <Route render={() => <Redirect to="/404" />} />
        </Switch>
    );
};

export default CRouter;
