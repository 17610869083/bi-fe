import React from "react";
import { Switch, Route } from "react-router-dom";

import Loadable from "@/components/Loadable";
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: '404' */ "@/containers/notFound")
});
const ToolBox = Loadable({
  loader: () => import(/* webpackChunkName: 'toolbox' */ "./toolbox")
});
const OperationLog = Loadable({
  loader: () => import(/* webpackChunkName: 'operationLog' */ "./operationLog")
});
const ConfigRoute = ({ match: { url } }) => (
  <Switch>
    {/* 工具箱 */}
    <Route path={`${url}/toolbox`} component={ToolBox} />
    {/* 操作日志 */}
    <Route path={`${url}/operationLog`} component={OperationLog} />
    {/* 404 */}
    <Route component={NotFound} />
  </Switch>
);
export default ConfigRoute;
