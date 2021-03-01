import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "@/components/Loadable";
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: '404' */ "@/containers/notFound")
});
const Points = Loadable({
  loader: () => import(/* webpackChunkName: 'points' */ "./points")
});
const ControlPointRoute = ({ match: { url } }) => (
  <Switch>
    {/* 管控点 */}
    <Route path={`${url}/points`} exact component={Points} />
    <Route component={NotFound} />
  </Switch>
);
export default ControlPointRoute;
