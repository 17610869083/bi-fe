import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "@/components/Loadable";

const School = Loadable({
  loader: () => import(/* webpackChunkName: 'school' */ "./school")
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: '404' */ "@/containers/notFound")
});
const StatisticsRoute = ({ match: { url } }) => (
  <Switch>
    {/* 园所统计列表 */}
    <Route path={`${url}/school`} exact component={School} />
    {/* 某个单独的园所统计 */}
    <Route path={`${url}/school/:schoolId`} component={School} />

    {/* 404 */}
    <Route component={NotFound} />
  </Switch>
);
export default StatisticsRoute;
