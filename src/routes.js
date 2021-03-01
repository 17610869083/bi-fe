import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Cookie from "js-cookie";
import StatisticsRoute from "@/containers/statistics/route";
import ConfigRoute from "@/containers/config/route";
import SysRoute from "@/containers/sys/route";
import ControlPoint from "@/containers/controlPoint/route";
import Loadable from "@/components/Loadable";

const Home = Loadable({
  loader: () => import("@/containers/home")
});

const NotFound = Loadable({
  loader: () => import("@/containers/notFound")
});
const ProtectedRoute = ({ component: Comp, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Cookie.get("Authorization") ? (
        <Comp {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default class RouteHub extends Component {
  render() {
    return (
      <Switch>
        {/* 首页 */}
        <ProtectedRoute path="/" exact component={Home} />
        {/* 运营统计 */}
        <ProtectedRoute path="/statistics" component={StatisticsRoute} />
        {/* 系统管理 */}
        <ProtectedRoute path="/sys" component={SysRoute} />
        {/* 管控点 */}
        <ProtectedRoute path="/controlPoint" component={ControlPoint} />
        {/* 配置中心 */}
        <ProtectedRoute path="/config" component={ConfigRoute} />
        {/* 无匹配：404 */}
        <ProtectedRoute component={NotFound} />
      </Switch>
    );
  }
}
