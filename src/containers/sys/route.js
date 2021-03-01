import React from "react";
import { Switch, Route } from "react-router-dom";

import Loadable from "@/components/Loadable";
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: '404' */ "@/containers/notFound")
});
const User = Loadable({
  loader: () => import(/* webpackChunkName: 'user' */ "./user")
});
const Dict = Loadable({
  loader: () => import(/* webpackChunkName: 'dict' */ "./dict")
});
const Menu = Loadable({
  loader: () => import(/* webpackChunkName: 'menu' */ "./menu")
});
const Role = Loadable({
  loader: () => import(/* webpackChunkName: 'role' */ "./role")
});
const SysRoute = ({ match: { url } }) => (
  <Switch>
    {/* 用户管理 */}
    <Route path={`${url}/user`} component={User} />
    {/* 字典管理 */}
    <Route path={`${url}/dict`} component={Dict} />
    {/* 菜单管理 */}
    <Route path={`${url}/menu`} component={Menu} />
    {/* 角色管理 */}
    <Route path={`${url}/role`} component={Role} />
    {/* 404 */}
    <Route component={NotFound} />
  </Switch>
);
export default SysRoute;
